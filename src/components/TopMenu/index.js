import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TopMenu = _ => {
    const [actives, setActives] = useState(['active', '', '', '']);

    const { fortmaticConnected, metamaskConnected } = useSelector(
        state => state.wallet
    );
    const dispatch = useDispatch();

    const setAddWallet = useCallback(
        payload => dispatch({ type: 'SetAddWallet', payload }),
        [dispatch]
    );

    useEffect(
        _ => {
            const { pathname } = window.location;

            switch (pathname) {
                case '/home':
                    setActives(['active', '', '', '']);
                    break;

                case '/dashboard':
                    setActives(['', 'active', '', '']);
                    break;
                case '/history':
                    setActives(['', '', '', 'active']);
                    break;
                case '/swap':
                    setActives(['', '', 'active', '']);
                    break;
                default:
                    break;
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [window.location.pathname]
    );

    const clearLocalStorage = _ => {
        localStorage.removeItem('wanmaskConnected');
        localStorage.removeItem('metamaskConnected');
        localStorage.removeItem('fortmaticConnected');
        localStorage.removeItem('ethAddress');
        localStorage.removeItem('address');
    };

    const handleDisconnect = _ => {
        clearLocalStorage();
        setTimeout(() => {
            window.location.replace('/');
        }, 1000);
    };

    return (
        <div className="top-menu">
            <div className="links">
                <Link className="logo" to="/home">
                    <img src="./img/logo.png" alt="home" />
                </Link>
                <Link className={`nav-link ${actives[0]}`} to="/home">
                    <span className="icon-link-1 icon" />
                </Link>

                {fortmaticConnected || metamaskConnected ? (
                    <Fragment>
                        <Link
                            className={`nav-link ${actives[1]}`}
                            to="/dashboard"
                        >
                            <span className="icon-link-2 icon" />
                        </Link>

                        <Link className={`nav-link ${actives[2]}`} to="/swap">
                            <span>
                                <i className="fas fa-exchange-alt"></i>
                            </span>
                        </Link>

                        <Link
                            className={`nav-link ${actives[3]}`}
                            to="/history"
                        >
                            <span className="icon-link-3 icon" />
                        </Link>
                    </Fragment>
                ) : null}
            </div>
            {fortmaticConnected || metamaskConnected ? (
                <div className="add" onClick={handleDisconnect}>
                    -
                </div>
            ) : (
                <div className="add" onClick={_ => setAddWallet(true)}>
                    +
                </div>
            )}
        </div>
    );
};

export default TopMenu;
