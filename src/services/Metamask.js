import React, { useEffect, useCallback } from 'react';
import openNotification from '../components/Notification';
import { useDispatch, useSelector } from 'react-redux';

export default function Metamask() {
    const dispatch = useDispatch();

    const setEthAddress = useCallback(
        data => dispatch({ type: 'SetEthAddress', payload: data }),
        [dispatch]
    );

    const { metamaskConnected } = useSelector(state => state.wallet);

    useEffect(
        _ => {
            if (metamaskConnected) {
                if (
                    typeof window.ethereum !== 'undefined' ||
                    typeof window.web3 !== 'undefined'
                ) {
                    // Web3 browser user detected. You can now use the provider.
                    // const provider = window['ethereum'] || window.web3.currentProvider;
                    window.ethereum.autoRefreshOnNetworkChange = false;

                    setEthAddress(window.ethereum.selectedAddress);

                    window.ethereum.on('accountsChanged', function(accounts) {
                        // Time to reload your interface with accounts[0]!
                        setEthAddress(accounts[0]);
                        openNotification({
                            message: 'Account updated'
                        });
                    });
                }
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [metamaskConnected]
    );
    return <div />;
}
