import React, { memo,useEffect } from 'react';
import './index.css';
import { widget } from '../../charting_library/charting_library.min';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const TVChartContainer = memo(() => {
	let defaultProps = {
		symbol: 'ETH-BTC',
		interval: '30',
		containerId: 'tv_chart_container',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
	/* 	clientId: 'tradingview.com',
		userId: 'public_user_id', */
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};
	let tvWidgetGeneral = null;
	useEffect(() => {
		const widgetOptions = {
			symbol: defaultProps.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			//datafeed: new window.Datafeeds.UDFCompatibleDatafeed(defaultProps.datafeedUrl), 
			/* eslint-disable */
			datafeed:new CandlesService('all'),
			interval: defaultProps.interval,
			container_id: defaultProps.containerId,
			library_path: defaultProps.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
		/* 	charts_storage_url: defaultProps.chartsStorageUrl,
			charts_storage_api_version: defaultProps.chartsStorageApiVersion,
			client_id: defaultProps.clientId,
			user_id: defaultProps.userId, */
			fullscreen: defaultProps.fullscreen,
			autosize: defaultProps.autosize,
			studies_overrides: defaultProps.studiesOverrides,
		};

		const tvWidget = new widget(widgetOptions);
		tvWidgetGeneral = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
		return()=>{
			if (tvWidgetGeneral !== null) {
				tvWidgetGeneral.remove();
				tvWidgetGeneral = null;
			}
		} 
	}, []);
	
	return (
		<div
				id={ defaultProps.containerId }
				className={ 'TVChartContainer' }
			/>
	);
});

export default TVChartContainer;
