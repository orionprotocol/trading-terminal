import React from 'react';

const AddWallet2 = props => {
	return (
		<div className="popup-wrapper js-add-wallet-2">
			<div className="popup-body">
				<div className="add-wallet-2">
					<div className="popup-top">
						<p className="title">Add Wallet</p>
						<div className="steps">
							<span>1</span>
							<span className="active">2</span>
						</div>
						<img className="close js-close" src="./img/close.png" alt="dash" onClick={props.hide2} />
					</div>
					<div className="methods">
						<div className="tab-titles">
							<button className="active js-tab-btn" data-tab="metamask">
								Metamask
							</button>
							<button className="js-tab-btn" data-tab="key">
								Private Key
							</button>
							<button className="js-tab-btn" data-tab="seed">
								Seed
							</button>
						</div>
						<div className="tabs">
							<div className="tab-metamask tab">
								<p className="desc">
									Trade tokens on the Ethereum blockchain using the MetaMask browser extension.
								</p>
								<div className="connect">
									<p className="subtitle">Connect to MetaMask</p>
									<p className="allow">Allow Orion to connect to MetaMask to begin.</p>
								</div>
								<p className="recommend">
									This is a recommended trading method. All transaction signing is done within the
									MetaMask extension, and private keys are never sent to the browser.
								</p>
							</div>
							<div className="tab-key tab">
								<div className="private-key">
									<span>Enter private key</span>
									<input type="password" />
								</div>
							</div>
						</div>
					</div>
					<div className="btns">
						<button className="back js-go-back-to-1" onClick={props.show1}>
							<img src="./img/arrow-down.svg" alt="dash" />
							<span>Go back</span>
						</button>
						<button className="connect">
							<img src="./img/fox.png" alt="dash" />
							<span>Connect</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddWallet2;
