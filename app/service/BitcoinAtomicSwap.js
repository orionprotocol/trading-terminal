import Contract from './Contract'
export default class BitcoinAtomicSwap {
    constructor (orionPublicKey) {
        this.orionPublicKey = orionPublicKey
    }

    /**
     *
     * @returns {Contract} Generated contract
     */
    initiate () {
        return new Contract('2N8s9p2usubsxZQEoJwDrD1Ft8RbdgiibQn', '63a61429c36b8dd380e0426', 'secret')
    }

    audit (redeemScript) {}

    redeem () {}

    refund () {}
}
