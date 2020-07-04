import React, { Fragment, useEffect, useState,useCallback } from 'react';
import { useSelector,useDispatch } from 'react-redux';
/* Modules */
import Sockets from './Sockets';
import WanmaskVerification from './WanmaskVerification';
import OrionWanchain from './OrionWanchain';
import Metamask from './Metamask';
import Fortmatic from './Fortmatic';
import Coinbase from './Coinbase';
import Assests from './possibleAssests';
/* Dependencies */
import axios from 'axios'


const Index = _ => {
    /* REDUX */
    const dispatch = useDispatch();
    const { wanmaskConnected } = useSelector(state => state.wallet);
    const { symbolA, symbolB} = useSelector(state => state.general);
    const setSupportTradingPair = useCallback(
        data => dispatch({ type: 'SetSupportTradingPair', payload: data }),
        [dispatch]
    );
     /* REDUX */
    const [render, setRender] = useState(null);
   

/* This use Effect return the data that will */
    useEffect(() => {
        /* setSupportTradingPair */
        axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/pairs/exchangeInfo`)
            .then(res => {
                let data_response = res.data
                let newData=[]
                for (let x = 0; x < data_response.length; x++) {
                    newData.push(
                        {...data_response[x],
                            symbolA:data_response[x].name.split('-')[0],
                            symbolB:data_response[x].name.split('-')[1]
                        }
                    )
                }
                setSupportTradingPair(newData) 
            })

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbolA, symbolB]);

    useEffect(
        _ => {
            if (window.wan3 !== undefined && wanmaskConnected) {
                setRender(
                    <Fragment>
                        <WanmaskVerification />
                    </Fragment>
                );
            }
        },
        [wanmaskConnected]
    );

    return (
        <Fragment>
            <Sockets />
            <Metamask />
            <OrionWanchain />
            <Fortmatic />
            <Coinbase />
            <Assests/>
            {render}
        </Fragment>
    );
};

export default Index;
