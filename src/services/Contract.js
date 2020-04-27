import Fortmatic from 'fortmatic';
import { FORTMATIC_API_KEY } from './Fortmatic';

// Web3 Docs - https://web3js.readthedocs.io/en/v1.2.4/
const Web3 = require('web3');
const Long = require('long');

/* En este objeto (tokensAddress) se deben declarar cada una de las direcciones de los
    contratos de los tokens a utlizar en la plataforma
*/
export const tokensAddress = {
    WBTC: '0x335123EB7029030805864805fC95f1AB16A64D61',
    WXRP: '0x15a3Eb660823e0a3eF4D4A86EEC0d66f405Db515',
    USDT: '0xfC1CD13A7f126eFD823E373C4086F69beB8611C2',
};

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const exchangeArtifact = require('../contracts/Exchange.json');
const contractAddress = exchangeArtifact.networks['3'].address;

// En esta clase se creara la instancia del contrato con web3, para poder invocar las funciones definidas
// en el contrato inteligente, las funciones del contrato que se invocan aqui son:
// withdraw, depositWan, depositAsset

export default class Contract {
    // el constructor recibe provider que puede ser 'metamask' o 'fortmatic',
    // dependiendo del provider se inicializa el Web3
    // para usarlo posteriormente para instanciar los contratos,
    // tanto del exchange como el de los tokens

    constructor(provider) {
        // console.log('contract ', provider);
        this.web3 = null;

        switch (provider) {
            case 'metamask':
                this.web3 = new Web3(window['ethereum']);
                break;
            case 'fortmatic':
                const fm = new Fortmatic(FORTMATIC_API_KEY, 'ropsten');
                this.web3 = new Web3(fm.getProvider());
                break;
            default:
                break;
        }

        // Asi se instancia el contrato del exchange
        // Exchange contract
        this.exchange = new this.web3.eth.Contract(
            exchangeArtifact.abi,
            contractAddress
        );

        // Tokens contract
        const TokenArtifact = require('../contracts/WBTC.json');

        this.tokensContracts = {};

        for (let token in tokensAddress) {
            this.tokensContracts[
                token.toLowerCase()
            ] = new this.web3.eth.Contract(
                TokenArtifact.abi,
                tokensAddress[token]
            );
        }
    }

    // === Hash Order=== //// CONVERT LONG TO BYTES
    longToBytes = long => {
        return this.web3.utils.bytesToHex(Long.fromNumber(long).toBytesBE());
    };

    // === GET ORDER HASH=== //
    hashOrder = orderInfo => {
        // console.log([
        //     '0x03',
        //     orderInfo.senderAddress,
        //     orderInfo.matcherAddress,
        //     orderInfo.baseAsset,
        //     orderInfo.quoteAsset,
        //     orderInfo.matcherFeeAsset,
        //     this.longToBytes(orderInfo.amount),
        //     this.longToBytes(orderInfo.price),
        //     this.longToBytes(orderInfo.matcherFee),
        //     this.longToBytes(orderInfo.nonce),
        //     this.longToBytes(orderInfo.expiration),
        //     orderInfo.side === 'buy' ? '0x00' : '0x01'
        // ]);
        let message = this.web3.utils.soliditySha3(
            '0x03',
            orderInfo.senderAddress,
            orderInfo.matcherAddress,
            orderInfo.baseAsset,
            orderInfo.quoteAsset,
            orderInfo.matcherFeeAsset,
            this.longToBytes(orderInfo.amount),
            this.longToBytes(orderInfo.price),
            this.longToBytes(orderInfo.matcherFee),
            this.longToBytes(orderInfo.nonce),
            this.longToBytes(orderInfo.expiration),
            orderInfo.side === 'buy' ? '0x00' : '0x01'
        );

        return message;
    };

    /*
    La funcion signOrder se utliza para firmar la orden (de compra o venta) recibe un objeto orderInfo,
    con los siguientes parametros:

    orderInfo = {
        senderAddress: senderAddress,
        matcherAddress: EthereumOrder.matcherPublicKey,
        baseAsset: baseAsset,
        quoteAsset: quoteAsset,
        matcherFeeAsset: side === 'buy' ? quoteAsset : baseAsset,
        amount: Assets.toLongValue(amount),
        price: Assets.toLongValue(price),
        matcherFee: 300000,
        nonce: nowTimestamp,
        expiration: nowTimestamp + 29 * 24 * 60 * 60 * 1000,
        side: side, //true = buy, false = sell
    };

    esta funcion signOrder es llamada en EthereumOrder

    Utiliza la libreria web3
    */

    signOrder = orderInfo =>
        new Promise((resolve, reject) => {
            let message = this.hashOrder(orderInfo);

            this.web3.eth.personal.sign(
                message,
                orderInfo.senderAddress,
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });

    decimalToBaseUnit = (currency, amount) => {
        // el exponente a multiplicar dependera del numero de decimales utilizados en el contrato inteligente
        // en este caso se usa (toWei) 1**18 y 1**8
        // https://web3js.readthedocs.io/en/v1.2.0/web3-utils.html#towei
        // Hay que realizar esta conversion porque asi es que trabaja la blockchain de ethereum, con weis

        // 1 ether = 1000000000000000000 wei

        if (currency === 'eth') {
            return Number(this.web3.utils.toWei(amount)).toFixed(0); // toWei multiplica el numero por 1**16
        } else {
            return (amount * 1e8).toFixed(0);
        }
    };

    // address es la direccion de la wallet del cliente
    deposit = async (currency, amount, address) => {
        /**
         * Como la plataforma esta corriendo sobre la blockchain de ethereum, para depositar eth
         * solo es necesario llamar a una funcion para transferir eth del cliente al contrato inteligente (exchange),
         * para realizar esto se invoca la funcion depositWan del contrato inteligente (exchange).
         *
         * Para transferir otros tokens diferentes a eth del usuario al contrato inteligente (exchange),
         * primero se debe solicitar la aprobacion del cliente con la funcion approve
         * y luego de tener la aprobacion invocar la funcion depositAsset, la cual
         * recibe dos parametros
         *
         * */

        address = this.web3.utils.toChecksumAddress(address);

        const newAmount = this.decimalToBaseUnit(currency, amount);

        try {
            if (currency === 'eth') {
                const res = await this.exchange.methods
                    .depositWan()
                    .send({ from: address, value: newAmount });
                console.log(res);
            } else {
                this.tokensContracts[currency].methods
                    .approve(contractAddress, newAmount)
                    .send({ from: address })
                    .once('transactionHash', hash => {
                        this.exchange.methods
                            .depositAsset(
                                tokensAddress[currency.toUpperCase()],
                                newAmount
                            )
                            .send({ from: address })
                            .on('error', console.error);
                    })
                    .on('error', console.error);
            }
        } catch (e) {
            // Toastr.showError('Invalid amount, ' + newAmount);
            // console.log('decimals error: ', newAmount);
            console.log(e);
        }
    };

    // Como la plataforma esta corriendo sobre la blockchain de ethereum,
    // al momento de retirar eth el primer parametro que es la address del
    // token es 0x0000000000000000000000000000000000000000
    // de lo contrario, para cualquier otro token se debe usar
    // su address correspondiente

    // address es la direccion de la wallet del cliente
    withdraw = async (currency, amount, address) => {
        if (!window.ethereum.selectedAddress) {
            window.ethereum.enable();
        }

        const newAmount = this.decimalToBaseUnit(currency, amount);

        try {
            if (currency === 'eth') {
                const res = await this.exchange.methods
                    .withdraw(ZERO_ADDRESS, newAmount)
                    .send({ from: address });
                console.log(res);
            } else {
                const res2 = await this.exchange.methods
                    .withdraw(tokensAddress[currency.toUpperCase()], newAmount)
                    .send({ from: address });

                console.log(res2);
            }
        } catch (e) {
            // Toastr.showError('Invalid amount, ' + newAmount);
            // console.log('decimals error: ', newAmount);
            console.log(e);
        }
    };

    // === GET SIGATURE OBJECT === //
    getSignatureObj = signature => {
        const netId = 3;
        signature = signature.substr(2); //remove 0x
        const r = '0x' + signature.slice(0, 64);
        const s = '0x' + signature.slice(64, 128);
        let v = this.web3.utils.hexToNumber('0x' + signature.slice(128, 130)); //gwan
        if (netId !== 3) v += 27; //ganache
        return { v, r, s };
    };

    validateSolidity = (orderInfo, signature) =>
        new Promise(async (resolve, reject) => {
            //Validate in smart contract

            // const this.exchange2 = this.web3.eth.contract(exchangeArtifact.abi, contractAddress);
            // console.log('exchange2', this.exchange2);

            // this.exchange.isValidSignature.call(orderInfo, getSignatureObj(signature), (err, res) => {
            // 	if (err) reject(err);
            // 	resolve(res);
            // });

            //------------- Felipe

            // const web3 = new Web3(web3.currentProvider);
            // const this.exchange2 = this.web3.eth.contract(exchangeArtifact.abi).at(contractAddress);
            // console.log(exchange2);

            let response = await this.exchange.methods
                .isValidSignature(orderInfo, this.getSignatureObj(signature))
                .call();

            resolve(response);
        });
}
