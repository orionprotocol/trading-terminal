import React from 'react';
import './index.css';

const AddWallet1 = props => {
	return (
		<div className="popup-wrapper js-add-wallet-1">
			<div className="popup-body">
				<div className="add-wallet-1">
					<div className="popup-top">
						<p className="title">Add Wallet</p>
						<div className="steps">
							<span className="active">1</span>
							<span>2</span>
						</div>
						<img className="close js-close" src="./img/close.png" alt="dash" onClick={props.hide1} />
					</div>
					<div className="choose-wallet">
						<div className="item js-next-step" onClick={props.show2}>
							<img className="icon" src="./img/big-eth.png" alt="dash" />
							<div className="text">
								<p className="name">Ethereum</p>
								<p className="desc">Ethereum is the solution</p>
							</div>
							<img className="next" src="./img/arrow-down.svg" alt="dash" />
						</div>
						<div className="item js-next-step" onClick={props.show2}>
							<img className="icon" src="./img/wanchain.png" alt="dash" />
							<div className="text">
								<p className="name">Wanchain</p>
								<p className="desc">Wanchain team has attended</p>
							</div>
							<img className="next" src="./img/arrow-down.svg" alt="dash" />
						</div>
						<div className="item js-next-step" onClick={props.show2}>
							<img className="icon" src="./img/waves.png" alt="dash" />
							<div className="text">
								<p className="name">Waves</p>
								<p className="desc">Revolutionizing the world</p>
							</div>
							<img className="next" src="./img/arrow-down.svg" alt="dash" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddWallet1;
