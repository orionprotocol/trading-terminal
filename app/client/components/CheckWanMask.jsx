import React from 'react';
import { Modal } from 'react-bootstrap';
const exchangeArtifact = require('./Exchange.json');

const isInstalled = () => {
	if (typeof wan3 !== 'undefined') {
		return true;
	} else {
		return false;
	}
};

const isLocked = () =>
	new Promise((resolve, reject) => {
		window.wan3.eth.getAccounts((err, accounts) => {
			if (err != null) {
				console.log('Wan err: ', err);
				reject(err);
			} else if (accounts.length === 0) {
				console.log('WanMask is locked');
				resolve(true);
			} else {
				// console.log('WanMask is unlocked');
				// console.log(accounts);
				resolve(false);
			}
		});
	});

// const checkBalance = () => {
// 	wan3.eth.getBalance(wan3.eth.accounts[0], function(err, result) {
// 		if (err != null) {
// 			console.log('Warn err: ', err);
// 		}
// 		let balances = [ result.c[0] / 10000 ];
// 		console.log(balances);
// 	});
// };

class Router extends React.Component {
	constructor() {
		super();
		this.state = {
			modalInstall: false,
			modalLock: false
		};
	}

	componentDidMount = async () => {
		if (!isInstalled()) {
			this.setState({ modalInstall: true });
		} else {
			let islocked = await isLocked();
			if (islocked) {
				this.setState({ modalLock: true });
			} else {
				setInterval(() => {
					window.wan3.eth.getAccounts((err, accounts) => {
						if (err != null) {
							console.log('Wan err: ', err);
						} else if (accounts.length === 0) {
						} else {
							let currentAccount = localStorage.getItem('currentAccount');
							if (currentAccount !== accounts[0]) {
								localStorage.setItem('currentAccount', accounts[0]);
							}
						}
					});
				}, 500);

				console.log('---------------------------------------------------------------');
				const exchange = window.wan3.eth
					.contract(exchangeArtifact.abi)
					.at('0x68906c3327833808FAe401b96b4A6EBBa8Bf0EA7');
				console.log('------------------------------------------------------t');
				console.log('exchange', exchange);
			}
		}
	};

	handleModal1 = _ => this.setState({ modalInstall: !this.state.modalInstall });

	handleModal2 = _ => this.setState({ modalLock: !this.state.modalLock });

	render = () => {
		return (
			<div>
				<Modal show={this.state.modalInstall} onHide={this.handleModal1}>
					<Modal.Body>
						<div style={{ backgroundColor: '#fff' }}>
							<div
								style={{
									padding: '20px',
									paddingTop: '0px'
								}}
							>
								<div>
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 style={{ color: '#656d75' }}>Please, install WanMask</h3>
										</div>
									</div>
									<div
										className="row"
										style={{
											padding: '20px',
											paddingLeft: '5px',
											borderRadius: '4px',
											marginTop: '5px'
										}}
									>
										<div className="col-md-12 text-center">
											<a className="btn btn-primary" href="https://wanmask.io/" target="_blank">
												Get Chrome Extension
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
				<Modal show={this.state.modalLock} onHide={this.handleModal2}>
					<Modal.Body>
						<div style={{ backgroundColor: '#fff' }}>
							<div
								style={{
									padding: '20px',
									paddingTop: '0px'
								}}
							>
								<div>
									<div className="row">
										<div className="col-md-12 text-center">
											<h3 style={{ color: '#656d75' }}>Please, Sign In on WanMask</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		);
	};
}

export default Router;
