import React, { useEffect, useCallback } from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Deposits from '../components/History/Deposits';
import Withdraws from '../components/History/Withdraws';
import { useDispatch } from 'react-redux';

let address = '',
	url = '';

if (window.wan3) {
	let account = localStorage.getItem('currentAccount');

	if (account && account !== '') {
		address = window.wan3.toChecksumAddress();
		url = process.env.REACT_APP_ORION_WAN + '/api/history/' + address;
	}
}

function History() {
	const dispatch = useDispatch();

	const setDeposits = useCallback((data) => dispatch({ type: 'SetDeposits', payload: data }), [ dispatch ]);
	const setWithdrawls = useCallback((data) => dispatch({ type: 'SetWithdrawls', payload: data }), [ dispatch ]);

	useEffect((_) => {
		if (url !== '') {
			axios
				.get(url)
				.then((res) => {
					if (res.data.length > 0) {
						let w = [],
							d = [];

						res.data.map((e) => {
							if (e.type === 'deposit') {
								return d.push(e);
							} else if (e.type === 'withdrawl') {
								return w.push(e);
							}
							return e;
						});

						setDeposits(d);
						setWithdrawls(w);
					}
				})
				.catch((err) => {
					if (err.response) console.log(err.response.data);
					else console.log(err);
				});
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<TopMenu />
			<div className="history">
				<Sidebar />

				<div className="my-container">
					<h1>Transaction History</h1>
					<div className="my-row">
						<Deposits />
						<Withdraws />
					</div>
				</div>
			</div>
		</div>
	);
}

export default History;
