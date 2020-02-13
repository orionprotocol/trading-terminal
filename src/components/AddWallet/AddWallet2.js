import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AddWallet2 = (props) => {
	const dispatch = useDispatch();

	const { walletOpt } = useSelector((state) => state.wallet);
	const setWanmaskConnect = useCallback((payload) => dispatch({ type: 'SetWanmaskConnect', payload }), [ dispatch ]);
	const [ opt, setOpt ] = useState('');

	useEffect(
		(_) => {
			switch (walletOpt) {
				case 'wanchain':
					setOpt('WanMask');
					break;
				case 'ethereum':
					setOpt('MetaMask');
					break;
				default:
					break;
			}
		},
		[ walletOpt ]
	);

	const [ tabs, setTabs ] = useState({
		wallet: [ 'active', true ],
		key: [ '', false ],
		seed: [ '', false ]
	});

	const handleClick = (type) => {
		switch (type) {
			case 'wallet':
				setTabs({
					wallet: [ 'active', true ],
					key: [ '', false ],
					seed: [ '', false ]
				});
				break;
			case 'key':
				setTabs({
					wallet: [ '', false ],
					key: [ 'active', true ],
					seed: [ '', false ]
				});
				break;
			case 'seed':
				setTabs({
					wallet: [ '', false ],
					key: [ '', false ],
					seed: [ 'active', true ]
				});
				break;

			default:
				break;
		}
	};

	const handleConnect = async (_) => {
		console.log(opt);
		switch (opt) {
			case 'WanMask':
				localStorage.setItem('wanmaskConnected', 'true');
				setWanmaskConnect(true);
				props.hide2();
				break;
			case 'MetaMask':
				if (window.ethereum) {
					const accounts = await window.ethereum.enable();
					console.log('accounts', accounts);
					props.hide2();
				}
				break;
			default:
				break;
		}
	};

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
							<button
								className={`js-tab-btn ${tabs.wallet[0]}`}
								data-tab="wallet"
								onClick={(_) => handleClick('wallet')}
							>
								{opt}
							</button>
							{/* <button
								className={`js-tab-btn ${tabs.key[0]}`}
								data-tab="key"
								onClick={_ => handleClick('key')}
							>
								Private Key
							</button>
							<button
								className={`js-tab-btn ${tabs.seed[0]}`}
								data-tab="seed"
								onClick={_ => handleClick('seed')}
							>
								Seed
							</button> */}
						</div>
						<div className="tabs">
							{tabs.wallet[1] ? (
								<div className="tab-metamask tab">
									{walletOpt === 'wanchain' ? (
										<p className="desc">
											Trade tokens on the Wanchain blockchain using the WanMask browser extension.
										</p>
									) : null}
									{walletOpt === 'ethereum' ? (
										<p className="desc">
											Trade tokens on the Ethereum blockchain using the MetaMask browser
											extension.
										</p>
									) : null}
									<div className="connect">
										<p className="subtitle">Connect to {opt}</p>
										<p className="allow">Allow Orion to connect to {opt} to begin.</p>
									</div>
									<p className="recommend">
										This is a recommended trading method. All transaction signing is done within the{' '}
										{opt} extension, and private keys are never sent to the browser.
									</p>
								</div>
							) : null}
							{tabs.key[1] ? (
								<div className="tab-key tab">
									<div className="private-key">
										<span>Enter private key</span>
										<input type="password" />
									</div>
								</div>
							) : null}

							{tabs.seed[1] ? (
								<div className="tab-key tab">
									<div className="private-key">
										<span>Enter seed</span>
										<input type="password" />
									</div>
								</div>
							) : null}
						</div>
					</div>
					<div className="btns">
						<button className="back js-go-back-to-1" onClick={props.show1}>
							<img src="./img/arrow-down.svg" alt="dash" />
							<span>Go back</span>
						</button>
						<button className="connect" onClick={handleConnect}>
							{opt === 'MetaMask' ? <img src="./img/fox.png" alt="dash" /> : null}
							<span>Connect</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddWallet2;
