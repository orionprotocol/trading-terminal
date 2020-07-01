import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './index.css';
import Carousel, { consts } from 'react-elastic-carousel'

const urlBase = process.env.REACT_APP_BACKEND;

const YourProfit = () => {
	const { symbol, qtyForm, sideForm, mode } = useSelector((state) => state.general);
	/* const [profits, setProfits] = useState(''); */
	const [profits2, setProfits2] = useState([]);
	let style
	if (mode === 'Dark') {
		style = { color: 'white' }
	} else {
		style = { color: ' rgb(139, 139, 139)' }
	}
	/* const createProfits = profits => {
		return profits.map((res, key) => {
			return (
				<div key={key} className={`exchange`}>
					<div className="name">
						<span
							style={{
								color: `rgb(240, ${Math.random() * (240 - 100) + 100}, ${Math.random() * (240 - 100) + 100})`,
								fontWeight: 'bold'
							}}
						>
							{res.name.toUpperCase()}
						</span>
					</div>
					<div className={`numbers `}
					style={style}
					>
						<span>+ {res.benefitPct} % </span>
						<span>+ {res.benefitBtc} BTC</span>
					</div>
				</div>
			)
		})
	} */

	const loadBenefits = () => {
		let url = `${urlBase}/api/v1/order-benefits?symbol=${symbol}&ordQty=${qtyForm}&side=${sideForm}`
		let aux = [], result;
		axios
			.get(url)
			.then((res) => {
				result = res.data
				for (let key in result) {
					aux.push({
						name: key,
						benefitBtc: parseFloat(result[key].benefitBtc),
						benefitPct: parseFloat(result[key].benefitPct)
					})
				}
				aux = aux.sort(function (a, b) {
					if (b.benefitBtc > a.benefitBtc) {
						return 1;
					}
					if (b.benefitBtc < a.benefitBtc) {
						return -1;
					}
					// a must be equal to b
					return 0;
				});

				/* setProfits(createProfits(aux)) */
				setProfits2(aux)
			})
			.catch((err) => {
				console.log('err: ', err);
			});
	};

	useEffect(
		(_) => {
			loadBenefits();
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[symbol, qtyForm, sideForm]
	);

	/* 	const myArrow = ({ type, onClick }) => {
			const pointer = type === consts.PREV ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-right"></i>
			return <button className='profits-arrows' onClick={onClick}>{pointer}</button>
		} */

	let prof = profits2.map((res, key) => {
		return (
			<span key={key}>
				 <label  style={{
					color: `rgb(120,133,169)`,
					fontWeight: '900',
					fontSize:'18px'
				}} >{res.name}</label>
				<label style={{fontSize:'12px'}}>+ {res.benefitPct} %</label>
				<label style={{fontSize:'12px'}}>+ {res.benefitBtc} BTC </label>
			</span>
		)
	})

	if (profits2 === []) return null

	return (
		<section className="your-profit">
			<div>
				<h2>Your Profits</h2>
			</div>
			{/*
			<div className={`your-profit-data`}>
				<Carousel renderArrow={myArrow} enableAutoPlay autoPlaySpeed={3000} itemsToShow={1} renderPagination={() => { return <div></div> }
				}>
						{profits}
				</Carousel>
			</div> */}

			<div className={`marquee ${mode}`}>
				<div className='marquee__wrap'>
					<div className="marquee__item">
						{prof}
					</div>
					<div className="marquee__item">
						{prof}
					</div>
				</div>
			</div>


		</section>
	);
};

export default YourProfit;
