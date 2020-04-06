import React, { useEffect, useCallback } from 'react';
// import { tokensAddress } from './Metamask';
import Fortmatic from 'fortmatic';
import { useSelector, useDispatch } from 'react-redux';

const Web3 = require('web3');

export const FORTMATIC_API_KEY = 'pk_test_4BEC597B2A4DA352';
// const FORTMATIC_API_KEY = 'pk_live_3C26F25E5BAEAF0D';

const fm = new Fortmatic(FORTMATIC_API_KEY, 'ropsten');
export const web3 = new Web3(fm.getProvider());

export default function FortmaticService() {
    const dispatch = useDispatch();

    const { fortmaticConnected } = useSelector(state => state.wallet);
    const setFortmaticConnect = useCallback(
        payload => dispatch({ type: 'SetFortmaticConnect', payload }),
        [dispatch]
    );
    const setEthAddress = useCallback(
        payload => dispatch({ type: 'SetEthAddress', payload }),
        [dispatch]
    );

    useEffect(
        _ => {
            // console.log(web3.enable());
            if (fortmaticConnected) {
                web3.eth.getAccounts((error, accounts) => {
                    if (accounts.length > 0) {
                        setFortmaticConnect(true);
                        setEthAddress(accounts[0]);
                    }
                });
            }

            // web3.eth.sendTransaction({
            //     // From address will automatically be replaced by the address of current user
            //     from: '0x0000000000000000000000000000000000000000',
            //     to: '0x22A99B2A2D1FA9AC4fCdF512bE691e87E782Ec8a',
            //     value: web3.utils.toWei('0.02', 'ether')
            // });
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [fortmaticConnected]
    );

    return <div></div>;
}
