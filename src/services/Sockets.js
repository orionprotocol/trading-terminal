import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { web3 } from './Fortmatic';

const io = require('socket.io-client');
let socket;

// websocketHeartbeatJs https://github.com/zimv/websocket-heartbeat-js
// el codigo de esta libreria esta en public/js/websocketHeartbeat.js

const Sockets = () => {
    const dispatch = useDispatch();

    let { contractBalances, walletBalances } = useSelector(
        state => state.balances
    );
    const { symbol, tickers } = useSelector(state => state.general);
    const {
        wanmaskConnected,
        metamaskConnected,
        ethAddress,
        fortmaticConnected,
        coinbaseConnected,
    } = useSelector(state => state.wallet);

    const [websocket, setWS] = useState(null);
    let [websocket2, setWS2] = useState(null);

    const setBalances = useCallback(
        data => dispatch({ type: 'SetBalances', payload: data }),
        [dispatch]
    );
    const setOrderBook = useCallback(
        data => dispatch({ type: 'SetOrderBook', payload: data }),
        [dispatch]
    );
    const setChange = useCallback(
        data => dispatch({ type: 'SetChange', payload: data }),
        [dispatch]
    );
    const setHigh = useCallback(
        data => dispatch({ type: 'SetHigh', payload: data }),
        [dispatch]
    );
    const setLow = useCallback(
        data => dispatch({ type: 'SetLow', payload: data }),
        [dispatch]
    );
    const setVol = useCallback(
        data => dispatch({ type: 'SetVol', payload: data }),
        [dispatch]
    );
    const setLastPrice = useCallback(
        data => dispatch({ type: 'SetLastPrice', payload: data }),
        [dispatch]
    );
    const setTickers = useCallback(
        data => dispatch({ type: 'SetTickers', payload: data }),
        [dispatch]
    );
    const setChangeInTickers = useCallback(
        data => dispatch({ type: 'SetChangeInTickers', payload: data }),
        [dispatch]
    );

    const [address] = useState(localStorage.getItem('currentAccount'));
    const [isConn, setIsConn] = useState(false);

    // Normal connection for Socket.io - only Wanmask
    useEffect(
        _ => {
            // if (window.wan3 && address) {
            if (wanmaskConnected) {
                socket = io.connect(process.env.REACT_APP_SOCKET_URL);
                socket.on('connect', _ => {
                    console.log(
                        'Connected....................................'
                    );
                    setIsConn(true);
                    if (window.wan3.toChecksumAddress(address)) {
                        // Este emit es para subscribirse a los cambios de los balances de esta direccion
                        socket.emit(
                            'clientAddress',
                            window.wan3.toChecksumAddress(address)
                        );
                    }
                });
            }

            // if (window.ethereum) {
            if (metamaskConnected) {
                // console.log('metamaskConnected');
                if (window.ethereum && !window.ethereum.selectedAddress) {
                    window.ethereum.enable();
                }
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [wanmaskConnected, metamaskConnected, fortmaticConnected,coinbaseConnected]
    );

    // Normal connection for Socket.io - only Metamask and Fortmatic
    useEffect(
        _ => {
            if (window.ethereum || (fortmaticConnected && ethAddress !== '') || (coinbaseConnected && ethAddress !== '')) {
                // console.log('window.ethereum');

                let address;

                if (metamaskConnected) {
                    const { selectedAddress } = window.ethereum;
                    address = selectedAddress;
                }

                if (!address) address = ethAddress;

                if (address) {
                    // console.log('selectedAddress', address);
                    localStorage.setItem('ethAddress', address);
                    // const { web3, ethereum } = window;
                    if (socket) {
                        socket.close();
                        console.log('Socket.io closed');
                    }
                    socket = io.connect(process.env.REACT_APP_SOCKET_URL);
                    socket.on('connect', _ => {
                        console.log(
                            'Connected....................................'
                        );
                        setIsConn(true);
                        // Este emit es para subscribirse a los cambios de los balances de esta direccion
                        socket.emit(
                            'clientAddress',
                            web3.utils.toChecksumAddress(address)
                        );
                    });
                }
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [window.ethereum, ethAddress]
    );
    useEffect(
        _ => {
            // --------------------- Orion-Wanchain Sockets -- Balances -----------------------------------------------------

            if (
                isConn &&
                (wanmaskConnected || metamaskConnected || fortmaticConnected ||coinbaseConnected) &&
                typeof contractBalances !== 'undefined' &&
                typeof walletBalances !== 'undefined'
            ) {
                socket.on('balanceChange', async data => {
                    // console.log('balanceChange', data);
                    const { wan3 } = window;

                    // if (!address) {
                    //     setAddress(ethereum.selectedAddress);
                    // }

                    // console.log('new balances 0', data);

                    if (
                        (wanmaskConnected &&
                            wan3.toChecksumAddress(data.user) ===
                                wan3.toChecksumAddress(address)) ||
                        ((metamaskConnected || fortmaticConnected || coinbaseConnected) &&
                            web3.utils.toChecksumAddress(data.user) ===
                                web3.utils.toChecksumAddress(ethAddress))
                    ) {
                        console.log('new balances', data);
                        const newBal = data.newBalance;

                        let newWalletBal = Number(data.newWalletBalance);
                        contractBalances[data.asset] = String(
                            newBal.toFixed(8)
                        );
                        walletBalances[data.asset] = String(
                            newWalletBal.toFixed(8)
                        );
                        setBalances({
                            contractBalances,
                            walletBalances,
                        });
                    }

                    socket.emit('balanceChange', 'received balance change');
                });
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [isConn, contractBalances, walletBalances]
    );

    useEffect(
        _ => {
            // ---------------------------------------- Orion Backend Sockets Aks - Bids ---------------

            if (websocket !== null) {
                websocket.close();
                setWS(null);
            }

            const urlWS = `${process.env.REACT_APP_URL_WS}/${symbol}`;

            const ws = new window.WebsocketHeartbeatJs({
                url: urlWS,
                pingTimeout: 3000,
                pongTimeout: 3000,
            });

            setWS(ws);
           /*  console.log(`orderBook.aggregatedAsks[0].price (${orderBook.aggregatedAsks[0].price}) is grater than orderBook.aggregatedAsks[1].price (${orderBook.aggregatedAsks[1].price})` ,orderBook.aggregatedAsks[0].price>orderBook.aggregatedAsks[1].price) */
          
            ws.onmessage = function (data) {
                /* console.log(JSON.parse(data.data)) */
                setOrderBook(JSON.parse(data.data));
            };

            //---------------------------------------   Last price (a symbol) ----------------------------

            // let ws2;

            if (websocket2 !== null) {
                websocket2.close();
                setWS2(null);
            }

            /*  console.log("los simbolos",sym)  */
            const urlWS2 = `${process.env.REACT_APP_URL_WS2}/ticker/${symbol}`;
            // console.log('url symbol ', urlWS2);

            websocket2 = new window.WebsocketHeartbeatJs({
                url: urlWS2,
                pingTimeout: 3000,
                pongTimeout: 3000,
            });

            setWS2(websocket2);

            websocket2.onmessage = function (data) {
                // setOrderBook(JSON.parse(data.data));
             
                data = JSON.parse(data.data)[1];
                let lastPrice = Number(data[1]);
                let openPrice = Number(data[2]);
                let change = Number(
                    ((lastPrice / openPrice - 1) * 100).toFixed(2)
                );
                let high = Number(data[3]).toFixed(6);
                let low = Number(data[4]).toFixed(6);
                let vol = Number(data[5]).toFixed(2);

                setChange(change); // 24h % change, porcentaje de cambio de las ultimas 24h
                setLow(low);
                setHigh(high);
                setVol(vol);
                setLastPrice(lastPrice);
                // console.log('setedLastPrice', lastPrice);
            };
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [symbol]
    );

    //------------------------------------ All tickers for CommonInfo, all pairs ----------------------------------------------

    useEffect(_ => {

        const ws = new window.WebsocketHeartbeatJs({
            url: `${process.env.REACT_APP_URL_WS2}/allTickers`,
            pingTimeout: 3000,
            pongTimeout: 3000,
        });
        ws.onmessage = data => {
            let response = JSON.parse(data.data);
         
            // data.forEach((e, i) => {
            for (let i = 1; i < response.length; i++) {
                let auxArray = response[i];
                let lastPrice = Number(auxArray[1])
                let openPrice = Number(auxArray[2]);
                let change = Number(
                    ((lastPrice / openPrice - 1) * 100).toFixed(2)
                );

                let ticker = {
                    lastPrice: lastPrice.toFixed(6),
                    vol24h: Number(auxArray[5]).toFixed(2),
                    change24h: change,
                };
                tickers[auxArray[0]] = ticker;
                
                if(window.location.href.includes('dashboard'))setChangeInTickers(Math.random())
                
                setTickers(tickers);
            }
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  
    return <div />;
};

export default Sockets;
