import React, { Fragment, useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import openNotification from '../../Notification';
import { FadeLoader } from 'react-spinners';

const Modal = (props) => {
	const [ amount, setAmount ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const handleSubmit = (_) => {
		if (props.operation === 'Withdraw') {
			if (Number(amount) > Number(props.maxWithdraw)) {
				openNotification({
					message: 'Insufficient balance'
				});
			} else {
				props.submit(amount);
			}
			//-------------------------------------------------------------------------
			// withdraw('wbtc', amount, address);
		} else {
			setLoading(true);
			props.submit(amount);
			//-------------------------------------------------------------------------
			// console.log('deposit', 'WBTC', amount, address);
			// deposit('wbtc', amount, address);
		}
	};

	useEffect(
		() => {
			if (props.show === false) {
				setLoading(false);
			}
			setAmount('');
		},
		[ props.show ]
	);

	return (
		<Fragment>
			{props.show ? (
				<FadeIn transitionDuration={500}>
					<div className="popup-wrapper deposit-withdraw">
						<div className="popup-body">
							<div className="add-wallet-2">
								<div className="popup-top">
									<p className="title">{props.operation}</p>
									{loading ? null : (
										<img
											className="close js-close"
											src="./img/close.png"
											alt="dash"
											onClick={props.toggle}
										/>
									)}
								</div>
								{loading ? (
									<div className="methods">
										<div className="tabs">
											<div className="tab-key tab">
												<div className="private-key wait">
													<span>Please wait . . .</span>
													<div>
														<FadeLoader
															height={15}
															width={5}
															radius={2}
															margin={2}
															color={'#84c8da'}
															loading={loading}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								) : (
									<Fragment>
										<div className="methods">
											<div className="tabs">
												<div className="tab-key tab">
													<div className="private-key">
														<span>Enter amount</span>
														<input
															type="number"
															value={amount}
															onChange={(e) => setAmount(e.target.value)}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="btns">
											<button className="back js-go-back-to-1" onClick={props.toggle}>
												<img src="./img/arrow-down.svg" alt="dash" />
												<span>Go back</span>
											</button>
											<button className="connect" onClick={handleSubmit}>
												<span>{props.operation}</span>
											</button>
										</div>
									</Fragment>
								)}
							</div>
						</div>
					</div>
				</FadeIn>
			) : null}
		</Fragment>
	);
};

export default Modal;
