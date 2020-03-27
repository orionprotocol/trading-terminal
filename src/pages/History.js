import React, { useEffect, useCallback, useState } from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Deposits from '../components/History/Deposits';
import Withdraws from '../components/History/Withdraws';
import { useDispatch, useSelector } from 'react-redux';

function History() {
    const dispatch = useDispatch();

    const [url, setUrl] = useState('');
    const { wanmaskConnected, metamaskConnected } = useSelector(
        state => state.wallet
    );

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
            if (metamaskConnected) {
                const { ethereum, web3 } = window;

                if (!ethereum) ethereum.enable();
                const address = web3.toChecksumAddress(
                    ethereum.selectedAddress
                );
                setUrl(
                    process.env.REACT_APP_ORION_WAN + '/api/history/' + address
                );
            }
        },
        [wanmaskConnected, metamaskConnected]
    );

    useEffect(
        _ => {
            if (url !== '') {
                console.log(url);
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
                    <h1>Transaction History</h1>
                    <div className="my-row">
                        <Deposits />
                        <Withdraws />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
