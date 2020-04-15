import React, { memo,useEffect, useCallback, useState } from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import SwapSelector from '../components/Swap';

import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
const web3 = new Web3();
const Swap = memo(() => {
    const dispatch = useDispatch();

    const [url, setUrl] = useState('');
    const {
        wanmaskConnected,
        metamaskConnected,
        ethAddress,
        fortmaticConnected,
    } = useSelector(state => state.wallet);

    const setDeposits = useCallback(
        data => dispatch({ type: 'SetDeposits', payload: data }),
        [dispatch]
    );
    const setWithdrawls = useCallback(
        data => dispatch({ type: 'SetWithdrawls', payload: data }),
        [dispatch]
    );

    useEffect(
        _ => {
            if (wanmaskConnected) {
                let account = localStorage.getItem('currentAccount');

                if (account && account !== '') {
                    const address = window.wan3.toChecksumAddress();
                    setUrl(
                        process.env.REACT_APP_ORION_WAN +
                            '/api/history/' +
                            address
                    );
                }
            }

            if (
                (metamaskConnected || fortmaticConnected) &&
                ethAddress !== ''
            ) {
                // const { ethereum, web3 } = window;
                // if (!ethereum) ethereum.enable();
                const address = web3.utils.toChecksumAddress(ethAddress);
                setUrl(
                    process.env.REACT_APP_ORION_WAN + '/api/history/' + address
                );
            }
        },
        [wanmaskConnected, metamaskConnected, fortmaticConnected, ethAddress]
    );

    useEffect(
        _ => {
            // console.log('url ', url);
            if (url !== '') {
                // console.log(url);
                axios
                    .get(url)
                    .then(res => {
                        if (res.data.length > 0) {
                            let w = [],
                                d = [];

                            res.data.map(e => {
                                if (e.type === 'deposit') {
                                    return d.push(e);
                                } else if (
                                    e.type === 'withdrawl' ||
                                    e.type === 'withdrawal'
                                ) {
                                    return w.push(e);
                                }
                                return e;
                            });

                            // console.log('d', d);
                            // console.log('w', w);

                            setDeposits(d);
                            setWithdrawls(w);
                        }
                    })
                    .catch(err => {
                        if (err.response) console.log(err.response.data);
                        else console.log(err);
                    });
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [url]
    );
    return (
        <div>
            <TopMenu />
            <div className="history">
                <Sidebar />

                <div className="my-container">
                   <SwapSelector/>
                </div>
            </div>
        </div>
    );
});

export default Swap;