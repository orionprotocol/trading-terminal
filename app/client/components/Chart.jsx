import React from "react";
import ReactDOM from "react-dom";
import { MomentJS } from "./../../service/MomentJS";
import { Toastr } from "./../../service/Toastr";

class Chart extends React.Component {
    constructor() {
        super();
        this.state = {
            themesConf: {
                themes: ["default", "black"],
                default: {
                    tradingView: {
                        candles: {
                            blue: {
                                upColor: "#5a81ea",
                                downColor: "#e5494d",
                                volume0: "rgba(209,56,60,0.3)",
                                volume1: "rgba(90,129,234,0.3)"
                            },
                            green: {
                                upColor: "#39a12c",
                                downColor: "#e5494d",
                                volume0: "rgba(200,0,00,0.3)",
                                volume1: "rgba(0,200,0,0.3)"
                            }
                        },
                        toolbarBg: "#fff",
                        customCssUrl: "css/tradingview-style/style.css",
                        OVERRIDES: {
                            "scalesProperties.lineColor": "#edf0f4",
                            "scalesProperties.textColor": "#4e5c6e",
                            "paneProperties.background": "#FFF",
                            "paneProperties.gridProperties.color": "#edf0f4",
                            "paneProperties.vertGridProperties.color":
                                "#edf0f4",
                            "paneProperties.horzGridProperties.color":
                                "#edf0f4",
                            "mainSeriesProperties.candleStyle.borderDownColor":
                                "#e5494d",
                            "mainSeriesProperties.candleStyle.borderUpColor":
                                "#5a81ea",
                            "mainSeriesProperties.hollowCandleStyle.borderDownColor":
                                "#e5494d",
                            "mainSeriesProperties.hollowCandleStyle.borderUpColor":
                                "#e5494d",
                            "mainSeriesProperties.haStyle.borderDownColor":
                                "#e5494d",
                            "mainSeriesProperties.candleStyle.wickUpColor":
                                "rgba(90, 129, 234, 0.5)",
                            "mainSeriesProperties.candleStyle.wickDownColor":
                                "rgba(229, 73, 77, 0.5)",
                            "mainSeriesProperties.hollowCandleStyle.wickUpColor":
                                "rgba(90, 129, 234, 0.5)",
                            "mainSeriesProperties.hollowCandleStyle.wickDownColor":
                                "rgba(229, 73, 77, 0.5)",
                            "mainSeriesProperties.haStyle.wickUpColor":
                                "rgba(90, 129, 234, 0.5)",
                            "mainSeriesProperties.haStyle.wickDownColor":
                                "rgba(229, 73, 77, 0.5)"
                        }
                    },
                    wAssetRateChart: { seriesColor: "#5a81ea" },
                    TokenChangeModalCtrl: { seriesColor: "#5a81ea" },
                    bgColor: "#2d2d2d"
                },
                black: {
                    tradingView: {
                        candles: {
                            blue: {
                                upColor: "#5a81ea",
                                downColor: "#e5494d",
                                volume0: "rgba(209,56,60,0.3)",
                                volume1: "rgba(90,129,234,0.3)"
                            },
                            green: {
                                upColor: "#39a12c",
                                downColor: "#e5494d",
                                volume0: "rgba(200,0,00,0.3)",
                                volume1: "rgba(0,200,0,0.3)"
                            }
                        },
                        toolbarBg: "#2d2d2d",
                        customCssUrl: "/tradingview-style/dark-style.css",
                        OVERRIDES: {
                            "paneProperties.background": "#2d2d2d",
                            "scalesProperties.lineColor": "#424242",
                            "scalesProperties.textColor": "#8c8c8c",
                            "paneProperties.gridProperties.color": "#424242",
                            "paneProperties.vertGridProperties.color":
                                "#424242",
                            "paneProperties.horzGridProperties.color":
                                "#424242",
                            "mainSeriesProperties.candleStyle.borderDownColor":
                                "#e5494d",
                            "mainSeriesProperties.hollowCandleStyle.borderDownColor":
                                "#e5494d",
                            "mainSeriesProperties.candleStyle.borderUpColor":
                                "#5a81ea",
                            "mainSeriesProperties.haStyle.borderUpColor":
                                "#5a81ea",
                            "mainSeriesProperties.hollowCandleStyle.borderUpColor":
                                "#e5494d",
                            "mainSeriesProperties.haStyle.borderDownColor":
                                "#e5494d",
                            "mainSeriesProperties.candleStyle.wickUpColor":
                                "rgba(90, 129, 234, 0.5)",
                            "mainSeriesProperties.candleStyle.wickDownColor":
                                "rgba(229, 73, 77, 0.5)",
                            "mainSeriesProperties.hollowCandleStyle.wickUpColor":
                                "rgba(90, 129, 234, 0.5)",
                            "mainSeriesProperties.hollowCandleStyle.wickDownColor":
                                "rgba(229, 73, 77, 0.5)",
                            "mainSeriesProperties.haStyle.wickUpColor":
                                "rgba(90, 129, 234, 0.5)",
                            "mainSeriesProperties.haStyle.wickDownColor":
                                "rgba(229, 73, 77, 0.5)"
                        }
                    },
                    wAssetRateChart: { seriesColor: "rgba(255,255,255,0.80)" },
                    TokenChangeModalCtrl: {
                        seriesColor: "rgba(255,255,255,0.80)"
                    },
                    bgColor: "#fff"
                }
            }
        };
        this.getParameterByName = this.getParameterByName.bind(this);
        this.getOverrides = this.getOverrides.bind(this);
        this.getStudiesOverrides = this.getStudiesOverrides.bind(this);
        this.createChart = this.createChart.bind(this);
        this.renderChartHeader = this.renderChartHeader.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.symbol != this.state.symbol) {
            let widget = this.state.widget;
            let id = this.props.id;
            this.setState({ symbol: nextProps.symbol }, () => {
                if (widget) {
                    window[id].setSymbol(
                        nextProps.symbol,
                        window[id].symbolInterval().interval
                    );
                }
            });
        }
        if (nextProps.loadChart) {
            if (!this.state.widget) {
                console.log("ID " + nextProps.id);
                this.createChart();
            }
        }
        if (this.props.isModal && !nextProps.loadChart && !nextProps.modal) {
            if (this.state.widget) {
                this.state.widget.remove();
                this.setState({ widget: null });
            }
        }
    }

    createChart() {
        const themeConf = this.state.themesConf.default.tradingView;
        const {
            upColor: up,
            downColor: down,
            volume0,
            volume1
        } = themeConf.candles.blue;
        const overridesResult = this.getOverrides(up, down);
        const getStudiesOverrides = this.getStudiesOverrides;
        const id = this.props.id;
        const height = this.props.height;
        const symbol = this.props.symbol;
        let setState = this.setState.bind(this);
        const exchange = this.props.exchange;
        console.log("ID " + id, "Height: " + height);
        const DISABLED_FEATURES = [
            "header_screenshot",
            "header_symbol_search",
            "symbol_search_hot_key",
            "display_market_status",
            "control_bar",
            "timeframes_toolbar",
            "volume_force_overlay"
        ];

        const overrides = { ...overridesResult, ...themeConf.OVERRIDES };
        const studies_overrides = {
            ...getStudiesOverrides({ volume0, volume1 }),
            ...themeConf.STUDIES_OVERRIDES
        };
        const toolbar_bg = themeConf.toolbarBg;
        const custom_css_url = themeConf.customCssUrl;

        var widget = (window[id] = new TradingView.widget({
            // debug: true, // uncomment this line to see Library errors and warnings in the console
            locale: "en",
            //fullscreen: true,
            symbol: symbol,
            width: "100%",
            height: height,
            interval: "30",

            container_id: id,
            //	BEWARE: no trailing slash is expected in feed URL
            datafeed: new CandlesService(exchange),
            library_path: "charting_library/",
            //autosize: true,
            toolbar_bg,
            disabled_features: DISABLED_FEATURES,
            // enabled_features: ENABLED_FEATURES,
            overrides,
            studies_overrides,
            custom_css_url
        }));
        setState({ widget: widget, symbol: symbol });
    }

    componentDidMount() {
        if (this.props.loadChart) {
            this.createChart();
        }
    }

    getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    getOverrides(candleUpColor, candleDownColor) {
        return {
            "mainSeriesProperties.candleStyle.upColor": candleUpColor,
            "mainSeriesProperties.candleStyle.downColor": candleDownColor,
            "mainSeriesProperties.candleStyle.drawBorder": false,
            "mainSeriesProperties.hollowCandleStyle.upColor": candleUpColor,
            "mainSeriesProperties.hollowCandleStyle.downColor": candleDownColor,
            "mainSeriesProperties.hollowCandleStyle.drawBorder": false,
            "mainSeriesProperties.barStyle.upColor": candleUpColor,
            "mainSeriesProperties.barStyle.downColor": candleDownColor,
            "mainSeriesProperties.haStyle.upColor": candleUpColor,
            "mainSeriesProperties.haStyle.downColor": candleDownColor,
            "mainSeriesProperties.haStyle.drawBorder": false,
            "mainSeriesProperties.lineStyle.color": candleUpColor,
            "mainSeriesProperties.areaStyle.color1": candleUpColor,
            "mainSeriesProperties.areaStyle.color2": candleUpColor,
            "mainSeriesProperties.areaStyle.linecolor": candleUpColor,
            volumePaneSize: "tiny"
        };
    }

    getStudiesOverrides({ volume0, volume1 }) {
        return {
            "volume.volume.color.0": volume0,
            "volume.volume.color.1": volume1
        };
    }

    renderChartHeader() {
        if (this.props.modal) {
            // let imagePath = "/resources/img/orderbook/{imageName}".replace(
            //     "{imageName}",
            //     this.props.imageName
            // );
            let imagePath = "img/orderbook/{imageName}".replace(
                "{imageName}",
                this.props.imageName
            );
            return <img style={{ width: "80px" }} src={imagePath} />;
        }
    }

    render() {
        return (
            <div style={{ marginTop: this.props.marginTop }}>
                <div className="row">
                    <div className="col-md-10">{this.renderChartHeader()}</div>
                </div>
                <div id={this.props.id} />
            </div>
        );
    }
}

export default Chart;
