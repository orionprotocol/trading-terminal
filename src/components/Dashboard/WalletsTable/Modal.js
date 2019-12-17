import React, { Fragment, useState } from 'react';
import FadeIn from 'react-fade-in';
import openNotification from '../../Notification';

const Modal = props => {
	const [ amount, setAmount ] = useState('');

	const handleSubmit = _ => {
		if (props.operation === 'Withdraw') {
			if (Number(amount) > Number(props.maxWithdraw)) {
				openNotification({
					message: 'Insufficient balance'
				});
			} else {
				props.submit(amount);
			}
		} else {
			props.submit(amount);
		}
	};

	return (
		<Fragment>
			{props.show ? (
				<FadeIn transitionDuration={500}>
					<div className="popup-wrapper deposit-withdraw">
						<div className="popup-body">
							<div className="add-wallet-2">
								<div className="popup-top">
									<p className="title">{props.operation}</p>
									<img
										className="close js-close"
										src="./img/close.png"
										alt="dash"
										onClick={props.toggle}
									/>
								</div>
								<div className="methods">
									<div className="tabs">
										<div className="tab-key tab">
											<div className="private-key">
												<span>Enter amount</span>
												<input
													type="number"
													value={amount}
													onChange={e => setAmount(e.target.value)}
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
									{/* <button className="connect" onClick={_ => props.submit(amount)}> */}
									<button className="connect" onClick={handleSubmit}>
										<span>{props.operation}</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</FadeIn>
			) : null}
		</Fragment>
	);
};

export default Modal;
