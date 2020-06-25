import React, { memo, useEffect, useCallback ,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { widget } from '../../charting_library/charting_library.min';

import {
    overrides,
    studies_overrides,
    custom_css_url,
    toolbar_bg,
    disabled_featureset,
    enabled_features,
    renderChart,
} from './renderChart';
console.log(disabled_featureset)


function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null
        ? null
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const TVChartContainer = memo(() => {
    const {
        symbolA,
        symbolB,
        lastPrice,
        high,
        low,
        vol,
        change,
        mode,
    } = useSelector(state => state.general);
    const {active} = useSelector(state => state.responsive.home);

    let defaultProps = {
        symbol: `${symbolA}-${symbolB}`,
        interval: '30',
        containerId: 'chart-container',
        libraryPath: '/charting_library/',
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        fullscreen: false,
        autosize: true,
    };

    let tvWidgetGeneral = null;
    const [tvChart,settvChart]=useState(null)
    useEffect(() => {
        renderChart(mode);
        let disabled_features=disabled_featureset

        if(active){
            disabled_features.push('header_widget')
        }else{
            if(disabled_features.indexOf('header_widget')!==-1){
                disabled_features= disabled_features.filter( data => data!=='header_widget' )
            }
        }
        console.log(active, disabled_features)
        const widgetOptions = {
            symbol: defaultProps.symbol,
            // BEWARE: no trailing slash is expected in feed URL
            /* eslint-disable */
            datafeed: new CandlesService('all'),
            interval: defaultProps.interval,
            container_id: defaultProps.containerId,
            library_path: defaultProps.libraryPath,
            locale: getLanguageFromURL() || 'en',
            fullscreen: defaultProps.fullscreen,
            autosize: defaultProps.autosize,

            overrides,
            studies_overrides,
            custom_css_url,
            toolbar_bg,
            disabled_features,
            enabled_features,
            theme: mode.toLowerCase(),
        };

        const tvWidget = new widget(widgetOptions);
        settvChart(tvWidget)
        tvWidgetGeneral = tvWidget;

        tvWidget.onChartReady(() => {
            tvWidget.headerReady().then(() => {
                const button = tvWidget.createButton();
                button.setAttribute(
                    'title',
                    'Click to show a notification popup'
                );
                button.classList.add('apply-common-tooltip');
                button.addEventListener('click', () =>
                    tvWidget.showNoticeDialog({
                        title: 'Notification',
                        body:
                            'TradingView Charting Library API works correctly',
                        callback: () => {
                            console.log('Noticed!');
                        },
                    })
                );
                button.innerHTML = 'Check API';
            });
        });
        
       return () => {
            if (tvWidgetGeneral !== null || tvChart!==null) {
                tvWidgetGeneral.remove();
                settvChart(null)
                tvWidgetGeneral = null;
            }
        }; 
    }, [mode,active]);

useEffect(() => {
    if (tvChart !== null) {
        tvChart.onChartReady(() => {
            tvChart.chart().setSymbol(`${symbolA}-${symbolB}`)
        });
    }
}, [symbolA, symbolB]);

    return (
        <>
           <div id={defaultProps.containerId} className={'TVChartContainer'} />
        </>
 
    
    );
});

export default TVChartContainer;
