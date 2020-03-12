import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Line from './Line';
import compareValues from '../../funtions/compareValues';
import './index.css';

const WalletsTable = props => {
    const { assets } = useSelector(state => state.wallet);
    const balances = useSelector(state => state.balances);
    const [contract, setContract] = useState({});
    const [wallet, setWallet] = useState({});
    const [classes, setClasses] = useState({
        token: 'fa fa-angle-down',
        wallet: 'fa fa-angle-down',
        contract: 'fa fa-angle-down',
        open: 'fa fa-angle-down'
    });

    const [lines, setLines] = useState([]);

    useEffect(
        _ => {
            let newContract = {},
                newWallet = {};
            for (let a in assets) {
                a = a.toUpperCase();
                newContract[a] = 0;
                newWallet[a] = 0;
            }
            setContract(newContract);
            setWallet(newWallet);
        },
        [assets]
    );

    useEffect(
        _ => {
            setLines(
                Object.keys(contract).map(a => ({
                    token: a.toUpperCase(),
                    wallet: wallet[a.toUpperCase()].toFixed(8),
                    contract: contract[a.toUpperCase()].toFixed(8),
                    open: 0,
                    img: `./img/${a.toLowerCase()}-wallet.png`
                }))
            );
        },
        [contract, wallet]
    );

    useEffect(
        _ => {
            try {
                const { contractBalances, walletBalances } = balances;
                if (contractBalances && walletBalances) {
                    let newContract = {},
                        newWallet = {};

                    for (let a in assets) {
                        if (contractBalances[assets[a.toUpperCase()]]) {
                            newContract[a.toUpperCase()] = Number(
                                contractBalances[assets[a.toUpperCase()]]
                            );
                        }

                        if (walletBalances[assets[a.toUpperCase()]]) {
                            newWallet[a.toUpperCase()] = Number(
                                walletBalances[assets[a.toUpperCase()]]
                            );
                        }
                    }

                    setContract({
                        // ...contract,
                        ...newContract
                    });

                    setWallet({
                        // ...contract,
                        ...newWallet
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [balances]
    );

    const handleSort = type => {
        // let newLines = []

        let newClasses = {};
        let sortType = 'asc';
        for (let e in classes) {
            if (e === type) {
                if (classes[e] === 'fa fa-angle-down') {
                    newClasses[e] = 'fa fa-angle-up';
                } else {
                    newClasses[e] = 'fa fa-angle-down';
                    sortType = 'desc';
                }
            } else {
                newClasses[e] = 'fa fa-angle-down';
            }
        }
        setClasses(newClasses);
        setLines([]);

        setTimeout(() => {
            let newLines = lines.sort(compareValues(type, sortType));
            setLines(newLines);
        }, 0);
    };

    return (
        <div className="wallets-table">
            <div className="titles">
                <div className="title" onClick={_ => handleSort('token')}>
                    <span>Token</span>
                    <i className={classes.token} />
                </div>
                <div className="title" onClick={_ => handleSort('wallet')}>
                    <span>Wallet</span>
                    <i className={classes.wallet} />
                </div>
                <div className="title" onClick={_ => handleSort('contract')}>
                    <span>Contract</span>
                    <i className={classes.contract} />
                </div>
                <div className="title" onClick={_ => handleSort('open')}>
                    <span>In open order</span>
                    <i className={classes.open} />
                </div>
                <div className="title actions">
                    <span>Actions</span>
                </div>
            </div>
            <div className="lines">
                {lines.map((e, i) => (
                    <Line
                        key={i}
                        currency={e.token}
                        wallet={e.wallet}
                        contract={e.contract}
                        img={e.img}
                        history={props.history}
                        open={e.open}
                    />
                ))}
            </div>
        </div>
    );
};

export default WalletsTable;
