const renderChart = (width, height, exchange, symbol) =>
	new TradingView.widget({
		width: width,
		height: height,
		symbol,
		interval: '30',
		// "timezone": "Etc/UTC",
		theme: 'Light',
		style: '2',
		locale: 'en',
		// "toolbar_bg": "#f1f3f6",
		// "enable_publishing": false,
		// "allow_symbol_change": true,
		container_id: 'chart-container',
		datafeed: new CandlesService(exchange),
		// symbol: symbol,
		library_path: 'charting_library/'
	});
