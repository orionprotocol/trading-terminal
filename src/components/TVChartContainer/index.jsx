import React, { memo, useEffect, useCallback ,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { widget } from '../../charting_library/charting_library.min';

import {
    overrides,
    studies_overrides,
    custom_css_url,
    toolbar_bg,
    disabled_features,
    enabled_features,
    renderChart,
} from './renderChart';

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

    let defaultProps = {
        symbol: `${symbolA}-${symbolB}`,
        interval: '30',
        containerId: 'chart-container',
        datafeedUrl: 'https://demo_feed.tradingview.com',
        libraryPath: '/charting_library/',
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        fullscreen: false,
        autosize: true,
        hide_left_toolbar_by_default:true,
        studiesOverrides: {},
    };

    let tvWidgetGeneral = null;
const [tvChart,settvChart]=useState(null)
    useEffect(() => {
        renderChart(mode);

        const widgetOptions = {
            symbol: defaultProps.symbol,
            // BEWARE: no trailing slash is expected in feed URL
            /* eslint-disable */
            datafeed: new CandlesService('all'),
            interval: defaultProps.interval,
            container_id: defaultProps.containerId,
            library_path: defaultProps.libraryPath,
            locale: getLanguageFromURL() || 'en',
            /* 		disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'], */
            fullscreen: defaultProps.fullscreen,
            autosize: defaultProps.autosize,
            // studies_overrides: defaultProps.studiesOverrides,
            //------------------------------------------------------
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
    }, [ mode]);

useEffect(() => {
    if (tvChart !== null) {
        console.log("entro aca?")
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
