import React, { memo ,useCallback,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const possibleAssests = memo(() => {
    const dispatch = useDispatch();
    const setAssets = useCallback(
        data => dispatch({ type: 'SetAssets', payload: data }),
        [dispatch]
    );
    const getAssets = pairs => {
        let res1 = [];
        let res2 = [];
    
        pairs.forEach(e => {
            let quote = e.split('-')[1];
    
            if (res1.indexOf(quote) < 0) res1.push(quote);
    
            if (!res2[quote]) {
                res2[quote] = [];
                res2[quote].push(e.split('-')[0]);
            } else {
                res2[quote].push(e.split('-')[0]);
            }
        });
        // console.log('res1', res1, 'res2', res2);
    
        return { assets1: res1, assets2: res2 };
    };
    useEffect(_ => {
        const url = process.env.REACT_APP_BACKEND + '/api/v1/pairs/list';
        // console.log(url);
        axios.get(url).then(res => {
            // console.log(res.data);
            setAssets(getAssets(res.data));
        });
        // const example = [ 'ETH-BTC', 'XRP-BTC', 'HOT-BTC', 'HOT-ETH' ];
        // setAssets(getAssets(example));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null

});

export default possibleAssests;