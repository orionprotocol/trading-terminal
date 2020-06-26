import Fortmatic from 'fortmatic';
import { FORTMATIC_API_KEY } from './Fortmatic';
import WalletLink from 'walletlink'
import Swal from 'sweetalert2'
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

const DOMAIN_TYPE = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "salt", type: "bytes32" },
];

const ORDER_TYPE = [
    { name: "senderAddress", type: "address" },
    { name: "matcherAddress", type: "address" },
    { name: "baseAsset", type: "address" },
    { name: "quoteAsset", type: "address" },
    { name: "matcherFeeAsset", type: "address" },
    { name: "amount", type: "uint64" },
    { name: "price", type: "uint64" },
    { name: "matcherFee", type: "uint64" },
    { name: "nonce", type: "uint64" },
    { name: "expiration", type: "uint64" },
    { name: "side", type: "string" },
];

const DOMAIN_DATA = {
    name: "Orion Exchange",
    version: "1",
    chainId: 3,
    salt:
        "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a557",
};

// En esta clase se creara la instancia del contrato con web3, para poder invocar las funciones definidas
// en el contrato inteligente, las funciones del contrato que se invocan aqui son:
// withdraw, depositWan, depositAsset
const customSwal = Swal.mixin({
    customClass: {
        title: 'title-class',
        content: 'content-class',
       
    },
  })

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
            case 'coinbase':
                const APP_NAME = 'Orion'
                const APP_LOGO_URL = 'https://demo.orionprotocol.io/img/logo.png'
                const ETH_JSONRPC_URL = 'https://ropsten.infura.io/v3/e7e50056370b47e0b71bdbc746887727'
                const CHAIN_ID = 3
                const walletLink = new WalletLink({
                    appName: APP_NAME,
                    appLogoUrl: APP_LOGO_URL,
                    darkMode: false
                })
                // Initialize a Web3 Provider object
                const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID)
                // Initialize a Web3 object
                this.web3 = new Web3(ethereum)

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
            const data = JSON.stringify({
                types: {
                  EIP712Domain: DOMAIN_TYPE,
                  Order: ORDER_TYPE,
                },
                domain: DOMAIN_DATA,
                primaryType: "Order",
                message: orderInfo,
              });
          
              const signer = this.web3.utils.toChecksumAddress(orderInfo.senderAddress);
          
              this.web3.currentProvider.sendAsync(
                {
                  method: "eth_signTypedData_v3",
                  params: [signer, data],
                  from: signer,
                },
                function (err, result) {
                  if (err || result.error) {
                    reject(result);
                  }
                  resolve(result.result); // signature
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
    deposit = async (currency, amount, address,metamaskConnected) => {
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
        if(metamaskConnected){
            customSwal.fire({
                title: 'Please Sign',
                text: `Sign the transactions with metamask`,
                showConfirmButton:false,
                showCloseButton: true,
                background: '#232A3E',
                padding:'3rem',
                allowOutsideClick:false,
                allowEscapeKey:false
              }) 
        }
        address = this.web3.utils.toChecksumAddress(address);
        const newAmount = this.decimalToBaseUnit(currency, amount);

        try {
            if (currency === 'eth') {
                const res = await this.exchange.methods
                    .depositWan()
                    .send({ from: address, value: newAmount },_=>{
                        if(metamaskConnected){
                            customSwal.fire({
                                title: 'Please wait',
                                text: `Your transaction is taking place`,
                                showConfirmButton:false,
                                showCloseButton: true,
                                background: '#232A3E',
                                padding:'3rem',
                                allowOutsideClick:false,
                                allowEscapeKey:false,
                                onOpen: () => {
                                    customSwal.showLoading();
                                  }
                              }) 
                        }
                    }).then(_=>{
                        customSwal.fire({
                            title: 'Your deposit has been done',
                            icon: 'success',
                            showConfirmButton:false,
                            showCloseButton: true,
                            background: '#232A3E',
                            padding:'3rem',
                            allowOutsideClick:false,
                            allowEscapeKey:false,
                            timer: 2000,
                          })
                    });
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
                            .send({ from: address },_=>{
                                if(metamaskConnected){
                                    customSwal.fire({
                                        title: 'Please wait',
                                        text: `Your transaction is taking place`,
                                        showConfirmButton:false,
                                        showCloseButton: true,
                                        background: '#232A3E',
                                        padding:'3rem',
                                        allowOutsideClick:false,
                                        allowEscapeKey:false,
                                        onOpen: () => {
                                            customSwal.showLoading();
                                          }
                                      }) 
                                }
                            }).on('receipt', _=>{
                                customSwal.fire({
                                    title: 'Your deposit has been done',
                                    icon: 'success',
                                    showConfirmButton:false,
                                    showCloseButton: true,
                                    background: '#232A3E',
                                    padding:'3rem',
                                    allowOutsideClick:false,
                                    allowEscapeKey:false,
                                    timer: 2000,
                                  })
                            })
                            .on('error', error=>{
                                if(metamaskConnected){
                                    customSwal.fire({
                                        text: `${error.message}`,
                                        icon: 'error',
                                        showConfirmButton:false,
                                        showCloseButton: true,
                                        background: '#232A3E',
                                        padding:'3rem',
                                        allowOutsideClick:false,
                                        allowEscapeKey:false,
                                      }) 
                                }
                            });
                    })
                    .on('error',error=>{
                        if(metamaskConnected){
                            customSwal.fire({
                                text: `${error.message}`,
                                icon: 'error',
                                showConfirmButton:false,
                                showCloseButton: true,
                                background: '#232A3E',
                                padding:'3rem',
                                allowOutsideClick:false,
                                allowEscapeKey:false,
                              }) 
                        }
                    });
            }
        } catch (e) {
            // Toastr.showError('Invalid amount, ' + newAmount);
            // console.log('decimals error: ', newAmount);
            if(metamaskConnected){
                customSwal.fire({
                    text: `${e.message}`,
                    icon: 'error',
                    showConfirmButton:false,
                    showCloseButton: true,
                    background: '#232A3E',
                    padding:'3rem',
                    allowOutsideClick:false,
                    allowEscapeKey:false,
                  }) 
            }
        }
    };

    // Como la plataforma esta corriendo sobre la blockchain de ethereum,
    // al momento de retirar eth el primer parametro que es la address del
    // token es 0x0000000000000000000000000000000000000000
    // de lo contrario, para cualquier otro token se debe usar
    // su address correspondiente

    // address es la direccion de la wallet del cliente
    withdraw = async (currency, amount, address,metamaskConnected) => {
        if(metamaskConnected){
            customSwal.fire({
                title: 'Please Sign',
                text: `Sign the transactions with metamask`,
                showConfirmButton:false,
                showCloseButton: true,
                background: '#232A3E',
                padding:'3rem',
                allowOutsideClick:false,
                allowEscapeKey:false
              }) 
        }
        if (!window.ethereum.selectedAddress) {
            window.ethereum.enable();
        }

        const newAmount = this.decimalToBaseUnit(currency, amount);

        try {
            if (currency === 'eth') {
                const res = await this.exchange.methods
                    .withdraw(ZERO_ADDRESS, newAmount)
                    .send({ from: address },_=>{
                        if(metamaskConnected){
                            customSwal.fire({
                                title: 'Please wait',
                                text: `Your transaction is taking place`,
                                showConfirmButton:false,
                                showCloseButton: true,
                                background: '#232A3E',
                                padding:'3rem',
                                allowOutsideClick:false,
                                allowEscapeKey:false,
                                onOpen: () => {
                                    customSwal.showLoading();
                                  }
                              }) 
                        }
                    }).then(_=>{
                        customSwal.fire({
                            title: 'Your withdrawal has been done',
                            icon: 'success',
                            showConfirmButton:false,
                            showCloseButton: true,
                            background: '#232A3E',
                            padding:'3rem',
                            allowOutsideClick:false,
                            allowEscapeKey:false,
                            timer: 2000,
                          })
                    })
                console.log(res);
            } else {
                const res2 = await this.exchange.methods
                    .withdraw(tokensAddress[currency.toUpperCase()], newAmount)
                    .send({ from: address },_=>{
                        if(metamaskConnected){
                            customSwal.fire({
                                title: 'Please wait',
                                text: `Your transaction is taking place`,
                                showConfirmButton:false,
                                showCloseButton: true,
                                background: '#232A3E',
                                padding:'3rem',
                                allowOutsideClick:false,
                                allowEscapeKey:false,
                                onOpen: () => {
                                    customSwal.showLoading();
                                  }
                              }) 
                        }
                    }).then(_=>{
                        customSwal.fire({
                            title: 'Your withdrawal has been done',
                            icon: 'success',
                            showConfirmButton:false,
                            showCloseButton: true,
                            background: '#232A3E',
                            padding:'3rem',
                            allowOutsideClick:false,
                            allowEscapeKey:false,
                            timer: 2000,
                          })
                    })

             
            }
        } catch (e) {
            // Toastr.showError('Invalid amount, ' + newAmount);
            // console.log('decimals error: ', newAmount);
            if(metamaskConnected){
                customSwal.fire({
                    text: `${e.message}`,
                    icon: 'error',
                    showConfirmButton:false,
                    showCloseButton: true,
                    background: '#232A3E',
                    padding:'3rem',
                    allowOutsideClick:false,
                    allowEscapeKey:false,
                  }) 
            }
            console.log(e);
        }
    };

    // === GET SIGATURE OBJECT === //

    validateSolidity = (orderInfo) =>
        new Promise(async (resolve, reject) => {
            //Validate in smart contract

            const isValid = await this.exchange.methods.validateOrder(orderInfo).call();

            resolve(isValid);
        });
}
