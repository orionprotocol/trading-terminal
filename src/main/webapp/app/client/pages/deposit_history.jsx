import React from 'react';
import {Modal} from 'react-bootstrap'
import QRCode from 'qrcode.react'
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import {MomentJS} from './../../service/MomentJS'

const regtestUtils = require('../../service/_regtest')
var orion = require('orion-atomic')
const wc = require('@waves/waves-crypto')
import ReactDOM from 'react-dom';
import {Toastr} from "../../service/Toastr";
import {WavesOrder} from "../../service/WavesOrder";

class DepositHistory extends React.Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            address: '',
            deposits: []
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadPublicKey = this.loadPublicKey.bind(this);
        this.renderDeposits = this.renderDeposits.bind(this);
        this.createNew = this.createNew.bind(this);
        this.renderDetails = this.renderDetails.bind(this);
        this.switchTable = this.switchTable.bind(this);
        this.switchSecret = this.switchSecret.bind(this);
        this.handlePaid = this.handlePaid.bind(this);
        this.paid = this.paid.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.swapAddress = this.swapAddress.bind(this);
        this.redeem = this.redeem.bind(this);
        this.switchBackground = this.switchBackground.bind(this);
    }

    componentDidMount() {
        // localStorage.setItem('deposits',[])
        orion.btcSwap.settings.network = regtestUtils.network

        orion.btcSwap.settings.client = {
            unspents: regtestUtils.unspents,
            calcFee: regtestUtils.calcFee,
            getBalance: regtestUtils.getBalance
        }
        orion.wavesSwap.settings.network = 'T'
        orion.wavesSwap.settings.nodeUrl = 'https://pool.testnet.wavesnodes.com'
        orion.wavesSwap.settings.assetId = 'EBJDs3MRUiK35xbj59ejsf5Z4wH9oz6FuHvSCHVQqZHS'

        let deposits = [];
        if (localStorage.getItem('deposits')) {
            deposits = JSON.parse(localStorage.getItem('deposits'));
        }
        console.log(localStorage.getItem("deposits"));
        this.setState({deposits: deposits})
        setInterval(() => {
            this.updateStatus()
        }, 3000);
        this.loadPublicKey()
    }

    loadPublicKey() {
        fetch(`http://${window.location.hostname}:5000/publicKey/btc`,
            {
                credentials: 'same-origin',
            }
        ).then(results => {
            return results.json();
        }).then(data => {
            this.setState({publicKey: data.publicKey})
        })
    }

    async swapAddress(deposit, myAddress) {
        try {
            const res = await (await fetch(`http://${window.location.hostname}:5000/swap/${deposit.address}`,
                {
                    credentials: 'same-origin'
                })).json();
            if (res.status.toLowerCase() === "ready") {
                deposit.respContract = res.respContract;
                const wavesSecretHash = await orion.wavesSwap.auditAccount(deposit.respContract.address, myAddress, deposit.amount)
                if (wavesSecretHash !== deposit.secretHash) {
                    throw new Error(`Incorrect response contract secret hash: ${wavesSecretHash}`)
                }
                deposit.status = "READY";
            }
            deposit.date = new Date();
            return deposit;
        } catch (e) {
            deposit.reason = e;
            deposit.status = "INVALID";
            deposit.date = new Date();
            return deposit;
        }
    }

    async updateStatus() {
        const myAddress = localStorage.getItem('address');
        if (!myAddress) {
            return;
        }

        const deposits = this.state.deposits;
        let isChanged = false;
        for (let i = 0; i < deposits.length; i++) {
            if (deposits[i].status.toLowerCase() === "pending") {
                await this.swapAddress(deposits[i], myAddress)
                isChanged = true;
            }
        }

        if (isChanged) {
            this.setState({deposits: deposits});
            localStorage.setItem('deposits', JSON.stringify(deposits))
        }
    }

    async redeem(deposit) {
        let address = localStorage.getItem('address') || '';
        if (!address) {
            Toastr.showError("Define address first.");
            return;
        }
        const deposits = this.state.deposits;
        try {
            const redeemTx = await orion.wavesSwap.redeem(deposit.respContract.publicKey, address, deposit.secret);

            await fetch(`http://${window.location.hostname}:5000/swap/${deposit.address}/redeem`,
                {
                    credentials: 'same-origin',
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

            for (let i = 0; i < deposits.length; i++) {
                if (deposits[i].address === deposit.address) {
                    deposits[i].status = "COMPLETED";
                    deposits[i].date = new Date();
                    break;
                }
            }
        } catch (e) {
            for (let i = 0; i < deposits.length; i++) {
                if (deposits[i].address === deposit.address) {
                    deposits[i].reason = e;
                    deposits[i].status = "INVALID";
                    deposits[i].date = new Date();
                    break;
                }
            }
        }
        this.setState({deposits: deposits});
        localStorage.setItem('deposits', JSON.stringify(deposits))
    }

    refund(deposit) {

        let deposits = this.state.deposits;
        for (let i = 0; i < deposits.length; i++) {
            if (deposits[i].address == deposit.address) {
                deposits[i].status = "REFUNDED"
                deposits[i].date = new Date();
                break;
            }
        }
        this.setState({deposits: deposits})
        localStorage.setItem('deposits', JSON.stringify(deposits))

    }

    showModal(address) {
        this.setState({address: address, modal: true})
    }

    closeModal() {
        this.setState({modal: false})
    }

    createNew() {
        let seed = localStorage.getItem('seed') || '';
        if (!seed) {
            Toastr.showError("Define seed first.");
            return;
        }
        let publicKey = wc.publicKey(seed);
        let address = wc.address(seed, orion.wavesSwap.settings.network)

        const newContract = orion.btcSwap.initiate(publicKey, Buffer.from(this.state.publicKey, 'hex'))
        let newDeposit = {
            address: newContract.address,
            secret: newContract.secret,
            script: newContract.script,
            secretHash: newContract.secretHash,
            publicKey: newContract.publicKey,
            date: new Date(),
            status: 'NEW',
            clientPublicKey: publicKey,
            clientAddress: address
        }
        if (this.state.deposits) {
            let deposits = this.state.deposits;
            deposits.push(newDeposit);
            this.setState({
                deposits: deposits
            })
        } else {
            this.setState({
                deposits: [newDeposit]
            })
        }
        localStorage.setItem('deposits', JSON.stringify(this.state.deposits));
    }

    renderDetails(deposit, detailId) {
        let renderDetails = [];
        let secretId = "secret" + detailId;
        renderDetails.push(
            <tr key={detailId} id={detailId} className="details-hide">
                <td style={{maxWidth: '300px'}} colSpan={6}>
                    <div>
                        <div>
                            <span style={{fontWeight: '600'}}>Script: </span> <span style={{overflowWrap: 'break-word'}}>{Buffer.from(deposit.script).toString('hex')}</span>
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <span className="details-btn" style={{border: 'none', outline: 'none'}}
                                  onClick={() => this.switchSecret(secretId)}><i className="fas fa-eye"></i></span>
                            <span id={secretId} className="secret-hide"><span style={{fontWeight:'600'}} >Secret: </span> {Buffer.from(deposit.secret).toString('hex')}</span>
                        </div>
                    </div>
                </td>
            </tr>
        );

        return renderDetails;
    }

    switchTable(detailsId) {
        $('#' + detailsId).toggleClass('details-hide')
    }

    switchSecret(secretId) {
        $('#' + secretId).toggleClass('secret-hide')
    }

    switchBackground(rowId) {
        $('#' + rowId).toggleClass('row-background')
    }

    paid(deposit) {
        fetch(`http://${window.location.hostname}:5000/swap/paid`,
            {
                credentials: 'same-origin',
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: deposit.address,
                    contractScript: Buffer.from(deposit.script).toString('hex'),
                    recipientAddress: deposit.clientAddress
                })
            }
        ).then(results => {
            if (!results.ok) throw new Error();
            else return results.json();
        }).then(data => {
            let deposits = this.state.deposits;
            for (let i = 0; i < deposits.length; i++) {
                if (deposits[i].address == deposit.address) {
                    deposits[i].status = "Pending"
                    deposits[i].date = new Date();
                    deposits[i].amount = data.amount;
                    break;
                }
            }

            this.setState({deposits: deposits})
            localStorage.setItem('deposits', JSON.stringify(deposits))
        })
    }

    handlePaid(deposit) {
        confirmAlert({
            title: 'Confirmation',
            message: 'Please confirm that you sent bitcoins to this deposit address and your transaction has more than 1 confirmations?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.paid(deposit)
                },
                {
                    label: 'No',
                    onClick: () => console.log("no")
                }
            ]
        });
    }

    renderButtons(deposit) {
        let buttons = [];
        let status = deposit.status.toLowerCase();
        if (status == "new") {
            buttons.push(
                <div>
                    <div>
                        <span className="details-btn" onClick={() => this.showModal(deposit.address)}
                              style={{border: 'none', outline: 'none'}}>
                            <i className="fas fa-qrcode"></i> Show QR cofde
                        </span>
                    </div>
                    <div style={{marginTop: '5px'}}>
                        <span className="details-btn" onClick={() => this.handlePaid(deposit)}
                              style={{border: 'none', outline: 'none'}}>
                            <i style={{fontSize: '20px'}} className="fas fa-hand-holding"></i> <span>Paid</span>
                        </span>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <span className="details-btn" onClick={() => this.refund(deposit)}
                              style={{border: 'none', outline: 'none'}}>
                            <i className="fas fa-redo-alt"></i> Refund
                        </span>
                    </div>
                </div>
            )
            return buttons;
        }
        if (status == "pending" || status == "paid" || status == "invalid") {
            buttons.push(<div>
                <div>
                    <span className="details-btn" onClick={() => this.refund(deposit)}
                          style={{border: 'none', outline: 'none'}}>
                        <i className="fas fa-redo-alt"></i> Refund
                    </span>
                </div>
            </div>)
            return buttons;
        }
        if (status == "ready") {
            buttons.push(<div>
                <div>
                    <span className="details-btn" style={{border: 'none', outline: 'none'}} onClick={() => this.redeem(deposit)}>
                        <i className="fas fa-handshake"></i> Redeem
                    </span>
                </div>
                <div>
                    <span className="details-btn" onClick={() => this.refund(deposit)}
                          style={{border: 'none', outline: 'none'}}>
                        <i className="fas fa-redo-alt"></i> Refund
                    </span>
                </div>
            </div>)
            return buttons;
        }
    }

    renderDeposits() {
        const deposits = this.state.deposits;
        let renderedDeposits = [];
        for (let i = 0; i < deposits.length; i++) {
            let detailsId = "detail-open" + i;
            let rowId = "details-row" + i;
            renderedDeposits.push(
                <tr id={rowId} key={i}>
                    <td>
                        {deposits[i].address}
                    </td>
                    <td>
                        {deposits[i].amount}
                    </td>
                    <td>
                        {MomentJS.renderTime(deposits[i].date)}
                    </td>
                    <td>
                        {deposits[i].status}
                    </td>
                    <td>
                        {this.renderButtons(deposits[i])}
                    </td>
                    <td>
                        <span className="details-btn" style={{border: 'none', outline: 'none'}}
                              onClick={() => {
                                  this.switchTable(detailsId);
                                  this.switchBackground(detailsId);
                                  this.switchBackground(rowId)
                              }}><i
                            className="fas fa-sort-down"></i></span>
                    </td>
                </tr>
            );
            renderedDeposits.push(
                this.renderDetails(deposits[i], detailsId)
            );
        }
        return renderedDeposits;
    }

    render() {
        let windowHeight = window.innerHeight + 'px';
        if (this.state.deposits.length > 0) {
            windowHeight = this.state.deposits.length * 265 + 'px';
        }
        return (
            <div style={{paddingRight: '20px', paddingLeft: '10px', paddingTop: '5px', height: windowHeight}}>

                <div style={{marginLeft: '90%'}}>
                    <button onClick={this.createNew} className="btn">Create New</button>
                </div>
                <div style={{backgroundColor: '#fff', marginTop: '20px'}}>
                    <table id="balance" style={{width: '100%', height: '100%', minHeight: '100%'}}>
                        <thead>
                        <td>
                            Address
                        </td>
                        <td>
                            Amount
                        </td>
                        <td>
                            Date
                        </td>
                        <td>
                            Status
                        </td>
                        <td>
                            Actions
                        </td>
                        <td>
                            Details
                        </td>
                        </thead>
                        <tbody>
                        {this.renderDeposits()}
                        </tbody>
                    </table>
                </div>
                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{backgroundColor: '#fff'}}>
                            <div style={{padding: '20px'}}>
                                <div>
                                    <div>
                                    <span style={{fontSize: '15px'}}>
                                        Copy and share your address
                                    </span>
                                    </div>
                                    <div style={{marginTop: '5px'}}>
                                        <div style={{
                                            backgroundColor: '#f8f9fb',
                                            border: '1px solid #dae1e9',
                                            padding: '15px',
                                            borderRadius: '4px'
                                        }}>
                                        <span style={{fontFamily: '\'Roboto-Regular\',sans-serif', fontSize: '17px'}}>
                                            {this.state.address}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop: '30px'}}>
                                    <div style={{
                                        textTransform: 'text-transform',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        whiteSpace: 'nowrap',
                                        boxSizing: 'border-box',
                                    }}>
                                        <span style={{color: '#2d2d2d', fontSize: '13px'}}>ИЛИ</span>
                                    </div>
                                </div>
                                <div style={{marginTop: '20px'}}>
                                    <div style={{
                                        textTransform: 'text-transform',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        whiteSpace: 'nowrap',
                                        boxSizing: 'border-box',
                                    }}>
                                        <span style={{color: '#2d2d2d', fontSize: '15px'}}>Scan QR-code</span>
                                    </div>
                                </div>
                                <div style={{marginTop: '40px'}}>
                                    <div style={{
                                        textTransform: 'text-transform',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        whiteSpace: 'nowrap',
                                        boxSizing: 'border-box',
                                    }}>
                                        <QRCode value={this.state.address}/>
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
;

export default DepositHistory;