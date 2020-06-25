const state = {
    themesConf: {
        themes: ['light', 'dark'],
        light: {
            tradingView: {
                candles: {
                    blue: {
                        upColor: '#5a81ea',
                        downColor: '#e5494d',
                        volume0: 'rgba(209,56,60,0.3)',
                        volume1: 'rgba(90,129,234,0.3)',
                    },
                    green: {
                        // upColor: '#A9E0BB',
                        // downColor: '#ffb9b5',
                        // upColor: '#9DE2BD',
                        // downColor: '#FBB1BD',
                        upColor: 'rgba(22, 184, 98, 0.8)',
                        downColor: 'rgba(245, 69, 98, 0.8)', // #16b86266
                        volume0: 'rgba(22, 184, 98, 0.3)',
                        volume1: 'rgba(245, 69, 98, 0.3)',
                    },
                },
                toolbarBg: '#fff',
                // customCssUrl: 'css/tradingview-style/style.css',
                OVERRIDES: {
                    'scalesProperties.lineColor': '#edf0f4',
                    'scalesProperties.textColor': '#4e5c6e',
                    'paneProperties.background': '#FFF', 
                    'paneProperties.gridProperties.color': '#edf0f4',
                    'paneProperties.vertGridProperties.color': '#edf0f4',
                    'paneProperties.horzGridProperties.color': '#edf0f4',
                    // 'mainSeriesProperties.candleStyle.borderDownColor': '#e5494d',
                    'mainSeriesProperties.candleStyle.borderDownColor':
                        'rgba(245, 69, 98, 0.8)',
                    // 'mainSeriesProperties.candleStyle.borderUpColor': '#5a81ea',
                    'mainSeriesProperties.candleStyle.borderUpColor':
                        'rgba(22, 184, 98, 0.8)',
                    'mainSeriesProperties.hollowCandleStyle.borderDownColor':
                        'rgba(245, 69, 98, 0.8)',
                    'mainSeriesProperties.hollowCandleStyle.borderUpColor':
                        'rgba(22, 184, 98, 0.8)',
                    'mainSeriesProperties.haStyle.borderDownColor':
                        'rgba(245, 69, 98, 0.8)',
                    'mainSeriesProperties.candleStyle.wickUpColor':
                        'rgba(22, 184, 98, 0.8)',
                    'mainSeriesProperties.candleStyle.wickDownColor':
                        'rgba(245, 69, 98, 0.8)',
                    'mainSeriesProperties.hollowCandleStyle.wickUpColor':
                        'rgba(22, 184, 98, 0.8)',
                    'mainSeriesProperties.hollowCandleStyle.wickDownColor':
                        'rgba(245, 69, 98, 0.8)',
                    'mainSeriesProperties.haStyle.wickUpColor':
                        'rgba(22, 184, 98, 0.8)',
                    'mainSeriesProperties.haStyle.wickDownColor':
                        'rgba(245, 69, 98, 0.8)',
                },
            },
            wAssetRateChart: { seriesColor: '#5a81ea' },
            TokenChangeModalCtrl: { seriesColor: '#5a81ea' },
            bgColor: '#2d2d2d',
        },
        dark: {
            tradingView: {
                candles: {
                    blue: {
                        upColor: '#5a81ea',
                        downColor: '#e5494d',
                        volume0: 'rgba(209,56,60,0.3)',
                        volume1: 'rgba(90,129,234,0.3)',
                    },
                    green: {
                        // upColor: '#19836D',
                        upColor: 'rgba(0, 255, 170, 0.8)',
                        downColor: 'rgba(255, 0, 170, 0.8)',
                        volume0: 'rgba(22, 184, 98,0.3)',
                        volume1: 'rgba(245, 69, 98,0.3)',
                    },
                },
                // toolbarBg: '#2d2d2d',
                toolbarBg: '#2a2a41',
                customCssUrl: '/tradingview-style/dark-style.css',
                OVERRIDES: {
                   'paneProperties.background': '#2d2d2d',
                    'paneProperties.background': '#2a2a41',
                    'scalesProperties.lineColor': '#424242',
                    'scalesProperties.textColor': '#8c8c8c',
                    'paneProperties.gridProperties.color': '#424242',
                    'paneProperties.vertGridProperties.color': '#424242',
                    'paneProperties.horzGridProperties.color': '#424242',
                    // 'mainSeriesProperties.candleStyle.borderDownColor': '#e5494d',
                    'mainSeriesProperties.candleStyle.borderDownColor':
                        'rgba(255, 0, 170, 0.8)',
                    // 'mainSeriesProperties.candleStyle.borderUpColor': '#5a81ea',
                    'mainSeriesProperties.candleStyle.borderUpColor':
                        'rgba(0, 255, 170, 0.8)',
                    'mainSeriesProperties.hollowCandleStyle.borderDownColor':
                        'rgba(255, 0, 170, 0.8)',
                    'mainSeriesProperties.haStyle.borderUpColor':
                        'rgba(0, 255, 170, 0.8)',
                    'mainSeriesProperties.hollowCandleStyle.borderUpColor':
                        'rgba(0, 255, 170, 0.8)',
                    'mainSeriesProperties.haStyle.borderDownColor':
                        'rgba(255, 0, 170, 0.8)',
                    'mainSeriesProperties.candleStyle.wickUpColor':
                        'rgba(0, 255, 170, 0.8)',
                    'mainSeriesProperties.candleStyle.wickDownColor':
                        'rgba(255, 0, 170, 0.8)',
                    'mainSeriesProperties.hollowCandleStyle.wickUpColor':
                        'rgba(0, 255, 170, 0.8)',
                    'mainSeriesProperties.hollowCandleStyle.wickDownColor':
                        'rgba(255, 0, 170, 0.8)',
                    'mainSeriesProperties.haStyle.wickUpColor':
                        'rgba(0, 255, 170, 0.8)',
                    'mainSeriesProperties.haStyle.wickDownColor':
                        'rgba(255, 0, 170, 0.8)',
                },
            },
            wAssetRateChart: { seriesColor: 'rgba(255,255,255,0.80)' },
            TokenChangeModalCtrl: {
                seriesColor: 'rgba(255,255,255,0.80)',
            },
            bgColor: '#fff',
        },
    },
};

let overrides, studies_overrides, custom_css_url, toolbar_bg;

const renderChart = mode => {
    let themeConf = {};
    let modeLow = mode.toLowerCase();

    if (modeLow === 'light') {
        themeConf = state.themesConf.light.tradingView;
    } else if (modeLow === 'dark') {
        themeConf = state.themesConf.dark.tradingView;
    }

    custom_css_url = themeConf.customCssUrl;
    toolbar_bg = themeConf.toolbarBg;
   


    const getOverrides = (candleUpColor, candleDownColor) => {
        return {
            'mainSeriesProperties.candleStyle.upColor': candleUpColor,
            'mainSeriesProperties.candleStyle.downColor': candleDownColor,
            'mainSeriesProperties.candleStyle.drawBorder': false,
            'mainSeriesProperties.hollowCandleStyle.upColor': candleUpColor,
            'mainSeriesProperties.hollowCandleStyle.downColor': candleDownColor,
            'mainSeriesProperties.hollowCandleStyle.drawBorder': false,
            'mainSeriesProperties.barStyle.upColor': candleUpColor,
            'mainSeriesProperties.barStyle.downColor': candleDownColor,
            'mainSeriesProperties.haStyle.upColor': candleUpColor,
            'mainSeriesProperties.haStyle.downColor': candleDownColor,
            'mainSeriesProperties.haStyle.drawBorder': false,
            'mainSeriesProperties.lineStyle.color': candleUpColor,
            'mainSeriesProperties.areaStyle.color1': candleUpColor,
            'mainSeriesProperties.areaStyle.color2': candleUpColor,
            'mainSeriesProperties.areaStyle.linecolor': candleUpColor,
            volumePaneSize: 'medium'  
        };
    };

    // const { upColor: up, downColor: down, volume0, volume1 } = themeConf.candles.blue;
    const {
        upColor: up,
        downColor: down,
        volume0,
        volume1,
    } = themeConf.candles.green;

    const getStudiesOverrides = ({ volume0, volume1 }) => {
        return {
            'volume.volume.color.0': volume0,
            'volume.volume.color.1': volume1,
        };
    };

    const overridesResult = getOverrides(up, down);

    overrides = {
        ...overridesResult,
        ...themeConf.OVERRIDES,
        // 'mainSeriesProperties.priceAxisProperties.autoScale': false,
        // 'mainSeriesProperties.priceAxisProperties.autoScaleDisabled': true,
        // 'paneProperties.axisProperties.autoScale': false,
        // 'paneProperties.axisProperties.lockScale': true
        // 'mainSeriesProperties.style': 2
    };

    studies_overrides = {
       /*  ...getStudiesOverrides({ volume0, volume1 }), */
        ...themeConf.STUDIES_OVERRIDES,
    };

  

 
};

const disabled_featureset = [
    
 // 'header_widget',  esto es para borrar el header, hay que buscar la forma de quitarlo cuando sea responsive
    'header_symbol_search',
    'header_compare',
    'header_undo_redo',
    'control_bar',
    'display_market_status',
    'show_hide_button_in_legend',
    'edit_buttons_in_legend',
    'header_chart_type',
    'volume_force_overlay',
    'hide_left_toolbar_by_default',
    'legend_context_menu',
    
    /* 'left_toolbar', *///this feature turn off the left bar
   /*  
        'header_symbol_search',
        'symbol_search_hot_key',
        'header_screenshot',
        'control_bar',
        'timeframes_toolbar',
        ' header_fullscreen_button', 
    */
    
];
const enabled_features = [
    'hide_left_toolbar_by_default',
    'hide_last_na_study_output'
];

export {
    overrides,
    studies_overrides,
    custom_css_url,
    toolbar_bg,
    disabled_featureset,
    enabled_features,
    renderChart,
};
