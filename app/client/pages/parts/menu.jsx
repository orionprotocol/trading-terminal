import React from "react";
import { Modal } from "react-bootstrap";
import ReactDOM from "react-dom";
import Navbar from "./navbar";

const regtestUtils = require("../../../service/_regtest");
var orion = require("orion-atomic");
const wc = require("@waves/waves-crypto");
class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            seed: "",
            publicKey: "",
            address: ""
        };

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeSeed = this.changeSeed.bind(this);
        this.changePublicKey = this.changePublicKey.bind(this);
        this.changeAddress = this.changeAddress.bind(this);

        orion.wavesSwap.settings.network = "T";
        orion.wavesSwap.settings.nodeUrl =
            "https://pool.testnet.wavesnodes.com";
        orion.wavesSwap.settings.assetId =
            "EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS";
    }

    changeSeed(e) {
        this.setState({
            seed: e.target.value
        });
        localStorage.setItem("seed", e.target.value);
        window.exchangeSeed = e.target.value;

        let publicKey = wc.publicKey(e.target.value);
        let address = wc.address(
            e.target.value,
            orion.wavesSwap.settings.network
        );

        this.changePublicKey(publicKey);
        this.changeAddress(address);
    }

    changePublicKey(value) {
        this.setState({
            publicKey: value
        });
        localStorage.setItem("publicKey", value);
        window.exchangePublicKey = value;
    }

    changeAddress(value) {
        this.setState({
            address: value
        });
        localStorage.setItem("address", value);
        window.exchangeAddress = value;
    }

    showModal() {
        this.setState({ modal: true });
    }

    closeModal() {
        this.setState({ modal: false });
    }

    componentDidMount() {
        let seed = localStorage.getItem("seed") || "";
        let publicKey = localStorage.getItem("publicKey") || "";
        let address = localStorage.getItem("address") || "";
        this.setState({
            seed: seed,
            publicKey: publicKey,
            address: address
        });
    }

    render() {
        let pathName = window.location.pathname;
        const settingsHeight = window.innerHeight - 400 + "px";
        return (
            <div>
                <Navbar />
                <div
                    className="col-md-1 sidebar"
                    style={{
                        // display: "none",
                        backgroundColor: "#fff",
                        height: "100vh",
                        padding: "0px",
                        width: "90px",
                        minHeight: "100%",
                        // marginBottom: "-9999px",
                        // paddingBottom: "9999px",
                        overflow: "hidden"
                    }}
                >
                    <div style={{ paddingLeft: "35%", marginTop: "10px" }}>
                        <img
                            style={{ borderRadius: "50%" }}
                            width="40"
                            height="40"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAFnElEQVR4Xu2dzWvcVRSGz2QymhmaVqGxUZJIoFI/oC4EiQYFxUURizt37qUbF/0rBHHflSvFgK5EBMEKUVoEPwN+bCSp0VhK1E5rsMnMZGTShlQhcs55S66/+ASyu2funee977nn/u7MndryuaW+Jf7m3pmz5eULiUizXmvduq2NVGyj3bKhTj0VqwSVGvPjM7M2+M/+1dICv/2WLf/0Y6rfbmvdekmBh9tNq3eGU/0OZnItFWlWasyPzczaLAL7VENgH6etVnM42E1LyTo42I3ZDAcHYOFgPywc7GdlCiwcHACNg/2wlEnJGuznzBocYEUVHYCFg/cIFmtwADRrsB8WDvazoooOsBo05Vm0E1h1n0Wfv5A6TXrv/Xftu++/deL5e7OJqUm75+h4KvbS4qotLS6mYpWgUmO+/9iD9tyzJ9NDL+JgZW+nrP1KkVVqzEq/xVK0MmgEjpkZBzt5lZqUSr842CnuoJkCWsk6Sr8IjMC7Eyg1K5V+KbICM1oBraQdpV8ERuBdCZSalEq/rMGBCa2AVrKO0i8CIzBF1jYBxUk4OOAkBRZF1h6BLuUGBEbgfVhFFzguVI7A5j89a+e/+iQwFXea9of6VtvMfTvpkYcftWdmTqT6VY5WFVaVrKI/Xjhr8wsfpUAr32144vhT9uTxp1P9KnWDspwhcEAuBA7AUmYlDg6ALvWZLAT2i6SwIkX7ORspOgBLmZWk6ABoUrQfFg72s5I+/oKDA6BxsB8WDvazwsF7xIoqOgAaBwdgUUX7YSmscLCfM/vgACvW4AAs3cHJ40Ll2G5sfMzumz4WeJs7Tdc3rtltjZFU7KEDd1r7j99Tsc3bm3Zt489U7NfffGlrV9ZSscoxpZSiq7gfTRG+EVTV95v+8llV33BW5Kq+XwR2Ko7ATlDXm+U//qbsR0ND/EdjBA7RQ2AvLnVCk6KdpHGwExQpOgRKesDCNinAGgcHYFFk+WGxBvtZSS1xcAgfVbQXFw72khLb4eAQQBzsxYWDvaTEdpV18KunX0ldRrq6dtEuD62msE0dmbZ7j0ynYjfaXfv10m+p2KtXr9jo6MFUbOtA0w7dPZqKba9dtoUfvkjFHm6M2x3Dh1OxW/vgl184lRJYuV5XSTvKN/XyC4N2053ifuUycQQO+EL5ZAUCB0Dj4AAsUrQfFg72s5IeoOPgAGgc7IeFg/2scHCAFVV0ABbbpAAs9sF+WGyT/Kyk30zEwQHQONgPCwf7WeHgACseVQZgsU0KwOKwwQ+r2DapX+tbf3jTP9KbWj5w9CE7eeL5VKxysWeqwxtByqWgH85/YJ8vfJbqvtatWy113ne9u/RxYamKtIqPKkuNGYEDnlLWYAQOgC4FC4EDIlURVhXHTIre55MSgRF4dwJU0f7ZUapuwMF+jaSrnxA4ALoULIqsgEhVhFXFMZOi9/mkRGAEporeJkCK3uduqKzAc6+9kTqMWrm4YktLiwFZd5qOjDRtbOyuVOzKLz9br9tNxSpBpcY8OTFlkxOT6aGn78kqtV1RHrBUMVbJHFtF1vK5pZSDEdhvKmViIbCfs3BDpnLxkxaLwAj8rwRI0c4JoqRZJRYHOwUaNFNAl4pFYAQmRW8TKOVCpV8cjINxMA4OuGC7KQ86/NBI0X5WlayEERiBdyVAkbXPJ4cs8JtnXk8dNii/x9cf6lttsxaQ5qamnbrVO8O5WCGq3+jZZiN3TKm8X+V3HrdOk1469WJK4FLPhZTvyyproXJlRSlWCBxwNAIHYCkzGgeHQJOivbhwsJfUVrv8aoiDQ6BxsBcXDvaSwsEhUkq2o4oOoMbBAVjKrGQNDoFmDfbiwsFeUqzBIVJKtmMNDqDGwQFYyqxkDQ6BZg324vofOtiL5ta2a7RbNtSp39oXdbxar7Vu3daGo+V/q8lfDozn5rFVdJUAAAAASUVORK5CYII="
                        />
                    </div>
                    <div
                        style={{
                            width: "100%",
                            padding: "27%",
                            paddingLeft: "28%",
                            paddingBottom: "0px",
                            marginTop: "5px"
                        }}
                    >
                        <div
                            style={{
                                width: "55px",
                                height: "55px",
                                backgroundColor:
                                    pathName == "/balance" ? "#1f5af6" : "#fff",
                                textAlign: "center",
                                paddingTop: "15px",
                                borderRadius: "10%"
                            }}
                        >
                            <a style={{ color: "#111" }} href="/balance">
                                <i
                                    style={{ fontSize: "28px" }}
                                    className="fas fa-wallet"
                                />
                            </a>
                        </div>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            padding: "27%",
                            paddingLeft: "28%"
                        }}
                    >
                        <div
                            style={{
                                width: "55px",
                                height: "55px",
                                backgroundColor:
                                    pathName == "/" ? "#1f5af6" : "#fff",
                                textAlign: "center",
                                paddingTop: "15px",
                                borderRadius: "10%"
                            }}
                        >
                            <a style={{ color: "#111" }} href="/">
                                <i
                                    style={{ fontSize: "28px" }}
                                    className="fas fa-stream"
                                />
                            </a>
                        </div>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            padding: "27%",
                            paddingLeft: "28%",
                            marginTop: settingsHeight
                        }}
                    >
                        <div
                            style={{
                                width: "55px",
                                height: "55px",
                                backgroundColor: "#fff",
                                textAlign: "center",
                                paddingTop: "15px",
                                borderRadius: "10%"
                            }}
                        >
                            <a
                                style={{ color: "#111", cursor: "pointer" }}
                                onClick={this.showModal}
                            >
                                <i
                                    style={{ fontSize: "28px" }}
                                    className="fas fa-cog"
                                />
                            </a>
                        </div>
                    </div>
                    <Modal show={this.state.modal} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title />
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ backgroundColor: "#fff" }}>
                                <div
                                    style={{
                                        padding: "20px",
                                        paddingTop: "0px"
                                    }}
                                >
                                    <div>
                                        <div className="row">
                                            <div>
                                                <span
                                                    style={{ color: "#9ba6b2" }}
                                                >
                                                    Seed phrase
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="row"
                                            style={{
                                                backgroundColor:
                                                    "rgb(248, 249, 251)",
                                                padding: "20px",
                                                paddingLeft: "5px",
                                                border: "1px dashed #dae1e9",
                                                borderRadius: "4px",
                                                marginTop: "5px"
                                            }}
                                        >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        onChange={
                                                            this.changeSeed
                                                        }
                                                        value={this.state.seed}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <div className="row">
                                            <div>
                                                <span
                                                    style={{ color: "#9ba6b2" }}
                                                >
                                                    Public key
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="row"
                                            style={{
                                                backgroundColor:
                                                    "rgb(248, 249, 251)",
                                                padding: "20px",
                                                paddingLeft: "5px",
                                                border: "1px dashed #dae1e9",
                                                borderRadius: "4px",
                                                marginTop: "5px"
                                            }}
                                        >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        value={
                                                            this.state.publicKey
                                                        }
                                                        readOnly
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <div className="row">
                                            <div>
                                                <span
                                                    style={{ color: "#9ba6b2" }}
                                                >
                                                    Address
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="row"
                                            style={{
                                                backgroundColor:
                                                    "rgb(248, 249, 251)",
                                                padding: "20px",
                                                paddingLeft: "5px",
                                                border: "1px dashed #dae1e9",
                                                borderRadius: "4px",
                                                marginTop: "5px"
                                            }}
                                        >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        value={
                                                            this.state.address
                                                        }
                                                        readOnly
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default Menu;
