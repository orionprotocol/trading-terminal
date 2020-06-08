import Contract, { tokensAddress } from './Contract';
import Swal from 'sweetalert2'

const Assets = {
    toLongValue: function (val, decimals = 8) {
        return Number((Number(val) * Math.pow(10, decimals)).toFixed(0));
    },
};

class EthereumOrder {
    static defaultMatcherFee = 300000;
    static defaultExpiration = 29 * 24 * 60 * 60 * 1000;
    static matcherPublicKey = '0xfbCAd2c3A90FBD94C335FBdF8E22573456Da7F68';
    // static orionUrl = process.env.REACT_APP_ORION_WAN;
    static orionUrl = process.env.REACT_APP_ORION_WAN;
    // baseAsset, es el que el cliente tiene; quoteAsset, es el activo que quiere
    // en compra tiene c2 y quiere c1
    // en venta tiene c1 y quiere c2

    constructor(provider) {
        const contract = new Contract(provider);
  
        this.signOrder = contract.signOrder;
        this.hashOrder = contract.hashOrder;
        this.validateSolidity = contract.validateSolidity;
    }

    /**
     * symbols = ['symbolA', 'symbolB']
     * side = 'buy' || 'sell'
     * price
     * amount // cantidad a comprar o vender
     *
     */
    toEthereumOrder = async (symbols, side, price, amount,provider) => {
        console.log('le dio click a buy', symbols, side, price, amount,provider)
        
        const customSwal = Swal.mixin({
            customClass: {
                title: 'title-class',
                content: 'content-class',
               
            },
          })

        if(provider){
            if(provider==='metamask'){
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
        }

        return new Promise(async (resolve, reject) => {
            
            window.addEventListener("unhandledrejection", function(promiseRejectionEvent) { 

                customSwal.fire({
                    text: `${promiseRejectionEvent.reason.message}`,
                    icon: 'error',
                    showConfirmButton:false,
                    showCloseButton: true,
                    background: '#232A3E',
                    padding:'3rem',
                    allowOutsideClick:false,
                    allowEscapeKey:false,
                  }) 
               
                /* console.log("al parecer no acepto",promiseRejectionEvent.reason)  */ 
            });
            // if (!window.ethereum) {
            //     reject();
            // }

            // senderAddress -> address de la wallet del cliente
            const senderAddress = localStorage.getItem('ethAddress');

            // baseAsset -> symbolA
            // quoteAsset -> symbolB
            let baseAsset,
                quoteAsset = null;
            const nowTimestamp = Date.now();

            // Se procede asignar las direcciones correspondientes para baseAsset y quoteAsset,
            // que dependera de las siguientes condiciones
            side = side.toLowerCase();
            if (symbols[0].toUpperCase() === 'ETH') {
                baseAsset = '0x0000000000000000000000000000000000000000';
            } else {
                baseAsset = tokensAddress[symbols[0].toUpperCase()];
            }

            if (symbols[1].toUpperCase() === 'ETH') {
                quoteAsset = '0x0000000000000000000000000000000000000000';
            } else {
                quoteAsset = tokensAddress[symbols[1].toUpperCase()];
            }

            // matcher es el que ejecuta la orden, en este caso el exchange

            const order = {
                senderAddress: senderAddress,
                matcherAddress: EthereumOrder.matcherPublicKey,
                baseAsset: baseAsset,
                quoteAsset: quoteAsset,
                matcherFeeAsset: side === 'buy' ? quoteAsset : baseAsset,
                amount: Assets.toLongValue(amount),
                price: Assets.toLongValue(price),
                matcherFee: 300000, // Este monto es fijado por el exchange
                nonce: nowTimestamp,
                expiration: nowTimestamp + 29 * 24 * 60 * 60 * 1000,
                side: side, //true = buy, false = sell
            };

            let signedOrder = await this.signOrder(order);

            order.signature = signedOrder;

           /*  console.log(order);
            console.log('----- Message: ', this.hashOrder(order));
            console.log('----- Signature: ', signedOrder);
            console.log('----- Signed By: ', senderAddress); */

            // Luego de que es firmada la orden por el cliente se realiza la validacion
            let validation = await this.validateSolidity(order, signedOrder);
            // console.log('validation', validation);
            // resolve('');
            // return;

            // Si la validacion es exitosa entonces se envia la orden al back
            if (validation) {
                if(customSwal.isVisible()){
                    customSwal.close()
                }
            
                fetch(`${EthereumOrder.orionUrl}/api/order`, {
                    credentials: 'same-origin',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(order),
                })
                    .then(results => {
                        return results.json();
                    })
                    .then(data => {
                        console.log("data del ultimo then",data)
                        if (data.code !== undefined) {
                            reject(data);
                        } else {
                            resolve('Order has been created');
                        }
                    })
                    .catch(e => {
                        reject(e);
                    });
            } else {
                reject(['Order validation failed', validation]);
            }

            // return signedOrder;
        });
    };
}

export { EthereumOrder, Assets };
