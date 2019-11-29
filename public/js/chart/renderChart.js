const state = {
	themesConf: {
		themes: [ 'default', 'black' ],
		default: {
			tradingView: {
				candles: {
					blue: {
						upColor: '#5a81ea',
						downColor: '#e5494d',
						volume0: 'rgba(209,56,60,0.3)',
						volume1: 'rgba(90,129,234,0.3)'
					},
					green: {
						upColor: '#39a12c',
						downColor: '#e5494d',
						volume0: 'rgba(200,0,00,0.3)',
						volume1: 'rgba(0,200,0,0.3)'
					}
				},
				toolbarBg: '#fff',
				customCssUrl: 'css/tradingview-style/style.css',
				OVERRIDES: {
					'scalesProperties.lineColor': '#edf0f4',
					'scalesProperties.textColor': '#4e5c6e',
					'paneProperties.background': '#FFF',
					'paneProperties.gridProperties.color': '#edf0f4',
					'paneProperties.vertGridProperties.color': '#edf0f4',
					'paneProperties.horzGridProperties.color': '#edf0f4',
					'mainSeriesProperties.candleStyle.borderDownColor': '#e5494d',
					'mainSeriesProperties.candleStyle.borderUpColor': '#5a81ea',
					'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#e5494d',
					'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#e5494d',
					'mainSeriesProperties.haStyle.borderDownColor': '#e5494d',
					'mainSeriesProperties.candleStyle.wickUpColor': 'rgba(90, 129, 234, 0.5)',
					'mainSeriesProperties.candleStyle.wickDownColor': 'rgba(229, 73, 77, 0.5)',
					'mainSeriesProperties.hollowCandleStyle.wickUpColor': 'rgba(90, 129, 234, 0.5)',
					'mainSeriesProperties.hollowCandleStyle.wickDownColor': 'rgba(229, 73, 77, 0.5)',
					'mainSeriesProperties.haStyle.wickUpColor': 'rgba(90, 129, 234, 0.5)',
					'mainSeriesProperties.haStyle.wickDownColor': 'rgba(229, 73, 77, 0.5)'
				}
			},
			wAssetRateChart: { seriesColor: '#5a81ea' },
			TokenChangeModalCtrl: { seriesColor: '#5a81ea' },
			bgColor: '#2d2d2d'
		},
		black: {
			tradingView: {
				candles: {
					blue: {
						upColor: '#5a81ea',
						downColor: '#e5494d',
						volume0: 'rgba(209,56,60,0.3)',
						volume1: 'rgba(90,129,234,0.3)'
					},
					green: {
						upColor: '#39a12c',
						downColor: '#e5494d',
						volume0: 'rgba(200,0,00,0.3)',
						volume1: 'rgba(0,200,0,0.3)'
					}
				},
				toolbarBg: '#2d2d2d',
				customCssUrl: '/tradingview-style/dark-style.css',
				OVERRIDES: {
					'paneProperties.background': '#2d2d2d',
					'scalesProperties.lineColor': '#424242',
					'scalesProperties.textColor': '#8c8c8c',
					'paneProperties.gridProperties.color': '#424242',
					'paneProperties.vertGridProperties.color': '#424242',
					'paneProperties.horzGridProperties.color': '#424242',
					'mainSeriesProperties.candleStyle.borderDownColor': '#e5494d',
					'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#e5494d',
					'mainSeriesProperties.candleStyle.borderUpColor': '#5a81ea',
					'mainSeriesProperties.haStyle.borderUpColor': '#5a81ea',
					'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#e5494d',
					'mainSeriesProperties.haStyle.borderDownColor': '#e5494d',
					'mainSeriesProperties.candleStyle.wickUpColor': 'rgba(90, 129, 234, 0.5)',
					'mainSeriesProperties.candleStyle.wickDownColor': 'rgba(229, 73, 77, 0.5)',
					'mainSeriesProperties.hollowCandleStyle.wickUpColor': 'rgba(90, 129, 234, 0.5)',
					'mainSeriesProperties.hollowCandleStyle.wickDownColor': 'rgba(229, 73, 77, 0.5)',
					'mainSeriesProperties.haStyle.wickUpColor': 'rgba(90, 129, 234, 0.5)',
					'mainSeriesProperties.haStyle.wickDownColor': 'rgba(229, 73, 77, 0.5)'
				}
			},
			wAssetRateChart: { seriesColor: 'rgba(255,255,255,0.80)' },
			TokenChangeModalCtrl: {
				seriesColor: 'rgba(255,255,255,0.80)'
			},
			bgColor: '#fff'
		}
	}
};

const themeConf = state.themesConf.default.tradingView;

// const overrides = { ...overridesResult, ...themeConf.OVERRIDES,
// 	"mainSeriesProperties.priceAxisProperties.autoScale": false,
// 	"mainSeriesProperties.priceAxisProperties.autoScaleDisabled": true,
// 	"paneProperties.axisProperties.autoScale": false,
// 	"paneProperties.axisProperties.lockScale": true,
// 	// "paneProperties.topMargin": "100"
// };

const custom_css_url = themeConf.customCssUrl;
const toolbar_bg = themeConf.toolbarBg;
const DISABLED_FEATURES = [
	'header_screenshot',
	'header_symbol_search',
	'symbol_search_hot_key',
	'display_market_status',
	'control_bar',
	'timeframes_toolbar',
	'volume_force_overlay'
];

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
		volumePaneSize: 'tiny'
	};
};

const { upColor: up, downColor: down, volume0, volume1 } = themeConf.candles.blue;

const getStudiesOverrides = ({ volume0, volume1 }) => {
	return {
		'volume.volume.color.0': volume0,
		'volume.volume.color.1': volume1
	};
};

const overridesResult = getOverrides(up, down);

const overrides = {
	...overridesResult,
	...themeConf.OVERRIDES
	// 'mainSeriesProperties.priceAxisProperties.autoScale': false,
	// 'mainSeriesProperties.priceAxisProperties.autoScaleDisabled': true,
	// 'paneProperties.axisProperties.autoScale': false,
	// 'paneProperties.axisProperties.lockScale': true
};

const studies_overrides = {
	...getStudiesOverrides({ volume0, volume1 }),
	...themeConf.STUDIES_OVERRIDES
};

const renderChart = (exchange, symbol) => {
	const element = document.querySelector('#chart-container');
	const width = element.offsetWidth - 5;
	const height = element.offsetHeight - 5;

	new TradingView.widget({
		width: width,
		height: height,
		symbol,
		interval: '30',
		// "timezone": "Etc/UTC",
		locale: 'en',
		container_id: 'chart-container',
		datafeed: new CandlesService(exchange),
		overrides,
		library_path: 'charting_library/',
		custom_css_url,
		toolbar_bg,
		disabled_features: DISABLED_FEATURES,
		studies_overrides,
		// style: '2',
		theme: 'Light'
	});
};
