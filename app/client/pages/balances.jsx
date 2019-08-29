import React from "react";
import { Modal } from "react-bootstrap";
import QRCode from "qrcode.react";
const regtestUtils = require("../../service/_regtest");
var orion = require("orion-atomic");
const wc = require("@waves/waves-crypto");

import ReactDOM from "react-dom";
import { Toastr } from "../../service/Toastr";

class Balance extends React.Component {
    constructor() {
        super();
        this.state = {
            balances: {}
        };

        this.loadBalance = this.loadBalance.bind(this);
        this.renderBalances = this.renderBalances.bind(this);
        this.mapToImage = this.mapToImage.bind(this);
        this.showDeposit = this.showDeposit.bind(this);

        orion.wavesSwap.settings.network = "T";
        orion.wavesSwap.settings.nodeUrl =
            "https://pool.testnet.wavesnodes.com";
        orion.wavesSwap.settings.assetId =
            "EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS";
    }

    componentDidMount() {
        orion.btcSwap.settings.network = regtestUtils.network;
        orion.btcSwap.settings.client = {
            unspents: regtestUtils.unspents,
            calcFee: regtestUtils.calcFee,
            getBalance: regtestUtils.getBalance
        };
        setInterval(() => {
            this.loadBalance();
        }, 1000);
    }

    loadBalance() {
        let seed = localStorage.getItem("seed") || "";
        let address = wc.address(seed, "T");
        if (address) {
            // let url = ${window.location.hostname}
            fetch(`https://demo.orionprotocol.io:2083/api/balance/${address}`, {
                credentials: "same-origin"
            })
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ balances: data });
                });
        }
    }

    mapToImage(symbol) {
        switch (symbol) {
            case "btc":
                return "img/bitcoin.svg";
            case "waves":
                return "img/waves.svg";
            case "eth":
                return "img/ethereum.svg";
            case "xrp":
                return "img/ripple.svg";
        }
    }

    showDeposit(key) {
        if (key.toLowerCase() == "btc") {
            window.location.href = "/deposit";
        }
    }

    renderBalances() {
        const balances = this.state.balances;
        let renderedBalances = [];
        for (let key in balances) {
            if (balances.hasOwnProperty(key)) {
                const image = this.mapToImage(key.toLowerCase());
                renderedBalances.push(
                    <tr key={key}>
                        <td>
                            <div className="row" style={{ marginLeft: "5px" }}>
                                <div
                                    className="col-md-6 col-xs-6 balanceIcon"
                                    style={{
                                        backgroundSize: "100% 100%",
                                        backgroundImage: "url({image})".replace(
                                            "{image}",
                                            image
                                        )
                                    }}
                                />
                                <div
                                    className="col-md-6 col-xs-6 balanceText"
                                    style={{ paddingTop: "5px" }}
                                >
                                    {key}
                                </div>
                            </div>
                        </td>
                        <td>
                            <b>{balances[key]}</b>
                        </td>
                        <td>
                            <button
                                onClick={() => this.showDeposit(key)}
                                className="btn  balance-btn"
                            >
                                Deposit
                            </button>
                        </td>
                        <td>
                            <button className="btn balance-btn">
                                Withdraw
                            </button>
                        </td>
                    </tr>
                );
            }
        }
        return renderedBalances;
    }

    render() {
        const windowHeight = window.innerHeight + "px";
        let address = localStorage.getItem("address") || "";
        return (
            <div
                className="balanceContent"
                style={{
                    height: windowHeight
                }}
            >
                <div style={{ backgroundColor: "#fff", marginTop: "20px" }} className="balanceContent2">
                    <table
                        class="table"
                        id="balance"
                        style={{
                            width: "100%",
                            height: "100%",
                            minHeight: "100%"
                        }}
                    >
                        <thead>
                            <td>Asset</td>
                            <td>Balance</td>
                            <td>Deposit</td>
                            <td>Withdraw</td>
                        </thead>
                        <tbody>{this.renderBalances()}</tbody>
                    </table>
                </div>
                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title />
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ backgroundColor: "#fff" }}>
                            <div style={{ padding: "20px" }}>
                                <div>
                                    <div>
                                        <span style={{ fontSize: "15px" }}>
                                            Copy and share your address
                                        </span>
                                    </div>
                                    <div style={{ marginTop: "5px" }}>
                                        <div
                                            style={{
                                                backgroundColor: "#f8f9fb",
                                                border: "1px solid #dae1e9",
                                                padding: "15px",
                                                borderRadius: "4px"
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "'Roboto-Regular',sans-serif",
                                                    fontSize: "17px"
                                                }}
                                            >
                                                {address}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: "30px" }}>
                                    <div
                                        style={{
                                            textTransform: "text-transform",
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            whiteSpace: "nowrap",
                                            boxSizing: "border-box"
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#2d2d2d",
                                                fontSize: "13px"
                                            }}
                                        >
                                            ИЛИ
                                        </span>
                                    </div>
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <div
                                        style={{
                                            textTransform: "text-transform",
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            whiteSpace: "nowrap",
                                            boxSizing: "border-box"
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#2d2d2d",
                                                fontSize: "15px"
                                            }}
                                        >
                                            Scan QR-code
                                        </span>
                                    </div>
                                </div>
                                <div style={{ marginTop: "40px" }}>
                                    <div
                                        style={{
                                            textTransform: "text-transform",
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            whiteSpace: "nowrap",
                                            boxSizing: "border-box"
                                        }}
                                    >
                                        <QRCode value="34nvJWRGAnd2mh1qkHsBoPk6SvP4CPCKxK" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default Balance;
