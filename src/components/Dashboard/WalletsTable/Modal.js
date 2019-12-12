import React, { Fragment } from 'react';
import FadeIn from 'react-fade-in';

const Modal = props => {
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
												<input type="number" />
											</div>
										</div>
									</div>
								</div>
								<div className="btns">
									<button className="back js-go-back-to-1" onClick={props.toggle}>
										<img src="./img/arrow-down.svg" alt="dash" />
										<span>Go back</span>
									</button>
									<button className="connect">
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
