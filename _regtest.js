const assert = require('assert')
const bitcoin = require('bitcoinjs-lib')
const Client = require('bitcoin-core')
const getByteCount = require('./getByteCount')
const { retryWhen, delay, take, concatMap, throwError } = require('rxjs/operators')
const { from } = require('rxjs');
const dhttpCallback = require('dhttp/200')
const dhttp = options => new Promise((resolve, reject) => {
    return dhttpCallback(options, (err, data) => {
        if (err) return reject(err)
        else return resolve(data)
    })
})

const APIPASS = 'satoshi'
const APIURL = 'https://regtest.bitbank.cc/1'
const NETWORK = bitcoin.networks.testnet

class CloudClient {
    constructor() {
    }

    async sendRawTransaction(txHex) {
        return dhttp({
            method: 'POST',
            url: APIURL + '/t/push',
            body: txHex
        })
    }

    async getRawTransaction(txId) {
        const raw = await dhttp({
            method: 'GET',
            url: APIURL + '/t/' + txId + '/json'
        })

        raw.outs.forEach(o => {
            o.scriptPubKey = { addresses: [o.address] }
            o.value =  Number((o.value / 1e8).toFixed(8))
        })
        raw.vout = raw.outs
        return raw
    }

    async generate(count) {
        return dhttp({
            method: 'POST',
            url: APIURL + '/r/generate?count=' + count + '&key=' + APIPASS
        })
    }

    async importMulti() {
        return true
    }

    async sendToAddress(address, value) {
        return dhttp({
            method: 'POST',
            url: APIURL + '/r/faucet?address=' + address + '&value=' + Math.round(value*1e8) + '&key=' + APIPASS
        })
    }

    async getTransaction(txId) {
        const tx = await dhttp({
            method: 'GET',
            url: APIURL + '/t/' + txId + '/json'
        })
        return {details: [tx], timestamp: tx.timestamp}
    }

    async listUnspent(fro, to, addresses) {
        const unspents = await dhttp({
            method: 'GET',
            url: APIURL + '/a/' + addresses[0] + '/unspents'
        })

        const promises = unspents.map(async (u) => {
            const tx = await this.getTransaction(u.txId)
            const out = tx.details[0].outs[u.vout]
            return {
                txid: u.txId,
                vout: u.vout,
                amount: Number((out.value / 1e8).toFixed(8)),
                scriptPubKey: out.script
            }
        })

        const updated = await Promise.all(promises)
        return updated
    }

    async estimateSmartFee(confirm) {
        return { feerate: 0.001 }
    }
}

const client = new CloudClient()

async function broadcast (txHex) {
    return client.sendRawTransaction(txHex)
}

async function mine (count) {
    return client.generate(count)
}

async function faucet (address, value) {
    try {
        await client.importMulti([{scriptPubKey: {address: address}, timestamp: Math.floor(Date.now() / 1000)}], {rescan: false})
    } catch (e) {
        throw new Error(`Couldn't import address: ${address}, reason: ${e}`)
    }

    const txId = await client.sendToAddress(address, value / 1e8, 'sendtoaddress example', 'Nemo From Example.com')
    await client.generate(1)

    const tx = await client.getTransaction(txId)
    let unspent = tx.details[0]
    unspent.txId = txId
    unspent.timestamp = tx.time
    return unspent
}

async function unspents (address, timestamp = 0) {
    try {
        const outs = await client.listUnspent(1, 1000, [address])
        return outs
    } catch (e) {
        throw new Error(`Couldn't retrieve unspents for ${address}, reason: ${e}`)
    }
}

async function getBalance (address, timestamp = 0) {
    const outs = await unspents(address, timestamp)
    let sum = 0.0
    for (const unspent of outs) {
        sum += unspent.amount
    }
    return Number(sum.toFixed(8))
}

async function verify (txo) {
    const tx = await client.getRawTransaction(txo.txId, true)
    const txoActual = tx.vout[txo.vout]
    if (txo.address) assert.strictEqual(txoActual.scriptPubKey.addresses[0], txo.address)
    if (txo.value) assert.strictEqual(txoActual.value * 1e8, txo.value)
}

function getAddress (keyPair) {
    return bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: NETWORK }).address
}

function randomAddress () {
    return getAddress(bitcoin.ECPair.makeRandom({
        network: bitcoin.networks.testnet
    }), bitcoin.networks.testnet)
}

async function calcFee (ins, outs) {
    const { feerate } = await client.estimateSmartFee(2)
    const size = 291*Object.keys(ins).length + 34*Object.keys(outs).length
    return Math.round(feerate * size * 1e8 / 1024)
}

module.exports = {
    broadcast,
    calcFee,
    faucet,
    mine,
    network: NETWORK,
    unspents,
    verify,
    randomAddress,
    getAddress,
    getBalance,
    RANDOM_ADDRESS: randomAddress()
}
