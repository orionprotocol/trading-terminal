import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PairDrop from './PairDrop';
import axios from 'axios';
import './index.css';
let price = require('crypto-price');

function handleWrapper() {
	const div = document.querySelector('#js-wrapper-pair');
	div.classList.toggle('active');

	const arrow = document.querySelector('.link.js-pair-link');
	arrow.classList.toggle('active');

	const drop = document.querySelector('.pair-drop.js-pair-drop');
	drop.classList.toggle('active');
}

const CommonInfo = (props) => {
	const { symbolA, symbolB, lastPrice, high, low, vol, change } = useSelector((state) => state.general);

	const [ dollars, setDollars ] = useState({});

	useEffect((_) => {
		const url = process.env.REACT_APP_BACKEND + '/api/v1/pairs/list';
		console.log(url);

		axios.get(url).then((res) => {
			console.log(res.data);
		});
	}, []);

	useEffect(
		(_) => {
			price.getCryptoPrice('USD', symbolB).then((object) => {
				const last = (object.price * lastPrice).toFixed(2);
				setDollars({ last });
			});
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[ lastPrice ]
	);

	return (
		<div className="common-info js-panel-item js-pair">
			<div className="wrapper-pair js-wrapper-pair" id="js-wrapper-pair" />
			<div className="top">
				<div className="star">
					<i className="fa fa-star-o" aria-hidden="true" />
					<span>Pair</span>
				</div>
				<div className="pair-select">
					<div className="link js-pair-link" onClick={handleWrapper}>
						<span>
							{symbolA} / {symbolB}
						</span>
						<span className="icon-arrow-d" />
					</div>
					<PairDrop handleWrapper={handleWrapper} />
				</div>
			</div>
			<div className="price">
				<div className="last-price">
					<span className="title">Last price</span>
					<div className="value">
						<span className="emp">{lastPrice.toFixed(5)}</span>
						<span className="dollars">${dollars.last}</span>
					</div>
				</div>
				<div className="change">
					<span className="title">24h change</span>
					<div className="value">
						<img src="./img/growth.png" alt="home" />
						<p className="emp">
							+{change} <span>%</span>
						</p>
					</div>
				</div>
			</div>
			<div className="table">
				<div className="line">
					<span className="title">24h High</span>
					<p className="value averta">
						<span>{high}</span> <span className="small">${high}</span>
					</p>
				</div>
				<div className="line">
					<span className="title">24h Low</span>
					<p className="value averta">
						<span>{low}</span> <span className="small">${low}</span>
					</p>
				</div>
				<div className="line">
					<span className="title">24h Vol</span>
					<p className="value averta">
						<span>{vol}</span> <span className="small">${vol}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CommonInfo;
