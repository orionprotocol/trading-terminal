import React, { useState } from 'react';
import Modal from './Modal';

import { deposit, withdraw } from '../../../services/Wanmask';

const Line = (props) => {
	const [ depositModal, toggleDepositModal ] = useState(false);
	const [ withdrawModal, toggleWithdrawModal ] = useState(false);
	const currentAccount = localStorage.getItem('currentAccount');
	const handleTrade = (_) => props.history.push('/home');
	const handleDeposit = (_) => {
		toggleDepositModal(!depositModal);
	};
	const handleWithdraw = (_) => {
		toggleWithdrawModal(!withdrawModal);
	};

	const submitDeposit = async (amount) => {
		let res = await deposit(props.currency.toLowerCase(), amount, currentAccount);
		console.log(res);
		handleDeposit();
	};

	const submitWithdraw = async (amount) => {
		let res = await withdraw(props.currency.toLowerCase(), amount, currentAccount);
		console.log(res);
		handleWithdraw();
	};

	return (
		<div className="line">
			<div className="cell emp coins">
				<img src={props.img} alt="dash" style={{ width: 20, height: 20 }} />
				<span>{props.currency}</span>
			</div>
			<span className="cell">
				<span className="title-m">Wallet</span>
				{props.wallet}
			</span>
			<span className="cell">
				<span className="title-m">Contract</span> {props.contract}
			</span>
			<span className="cell">
				<span className="title-m">In open order</span> 0
			</span>
			<div className="cell actions">
				<button className="action" onClick={handleDeposit}>
					{' '}
					<img src="./img/arrow.png" alt="dash" />
					<span>Deposit</span>
				</button>
				<button className="action withdraw" onClick={handleWithdraw}>
					<img src="./img/arrow.png" alt="dash" />
					<span>Withdraw</span>
				</button>
				<button className="action" onClick={handleTrade}>
					{' '}
					<img src="./img/trade.png" alt="dash" />
					<span>Trade</span>
				</button>
			</div>

			<Modal
				show={depositModal}
				operation="Deposit"
				toggle={(_) => toggleDepositModal(!depositModal)}
				submit={submitDeposit}
			/>
			<Modal
				show={withdrawModal}
				operation="Withdraw"
				toggle={(_) => toggleWithdrawModal(!withdrawModal)}
				submit={submitWithdraw}
				maxWithdraw={props.contract}
			/>
		</div>
	);
};

export default Line;
