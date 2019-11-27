import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './index.css';

const PairDrop = props => {
	const dispatch = useDispatch();

	const setSymbolA = useCallback(data => dispatch({ type: 'SetSymbolA', payload: data }), [ dispatch ]);

	const handlePair = symbolA => {
		setSymbolA(symbolA);
		props.handleWrapper();
	};

	return (
		<div className="pair-drop js-pair-drop">
			<div className="titles">
				<span className="active">BTC</span>
				<span>USD</span>
				<span>ETH</span>
				<span>NEO</span>
				<span>EOS</span>
			</div>
			<div className="search">
				<div className="input">
					<input type="text" placeholder="Search pair" />
					<i className="fa fa-search" aria-hidden="true" />
				</div>
				<div className="favourite">
					<i className="fa fa-star-o" aria-hidden="true" />
					<span>Favourites</span>
				</div>
			</div>
			<div className="pair-table">
				<div className="titles-p">
					<div className="title">
						<span>Pair</span>
						<img src="./img/arrow-down.svg" alt="home" />
					</div>
					<div className="title short">
						<span>Last Pr.</span>
						<img src="./img/arrow-down.svg" alt="home" />
					</div>
					<div className="title short">
						<span>24h Vol</span>
						<img src="./img/arrow-down.svg" alt="home" />
					</div>
					<div className="title chg">
						<span>24h Change</span>
						<img src="./img/arrow-down.svg" alt="home" />
					</div>
				</div>
				<div className="lines">
					<div className="part">
						<div className="line" onClick={_ => handlePair('ETH')}>
							<div className="cell">
								<img className="img" src="./img/eth-wallet.png" alt="home" />
								<div className="text">
									<span className="emp">ETH</span>
									<span className="small">Ethereum</span>
								</div>
							</div>
							<div className="cell short">
								<span className="title-m">Last Pr.</span>
								<div className="text">
									<span className="emp">0.0174</span>
									<span className="small">$174.41</span>
								</div>
							</div>
							<div className="cell short">
								<span className="title-m">24h Change</span>
								<div className="text">
									<span className="emp">0.001500</span>
									<span className="small">$53.41</span>
								</div>
							</div>
							<div className="cell chg">
								<img src="./img/growth.png" alt="home" />
								<p>
									<span className="emp">+4,42</span> <span>%</span>
								</p>
								<div className="star js-star">
									<i className="fa fa-star-o" aria-hidden="true" />
								</div>
							</div>
						</div>
						<div className="line" onClick={_ => handlePair('XRP')}>
							<div className="cell">
								<img className="img" src="./img/xrp.jpg" alt="home" />
								<div className="text">
									<span className="emp">XRP</span>
									<span className="small">Ripple</span>
								</div>
							</div>
							<div className="cell short">
								<span className="title-m">Last Pr.</span>
								<div className="text">
									<span className="emp">0.0174</span>
									<span className="small">$174.41</span>
								</div>
							</div>
							<div className="cell short">
								<span className="title-m">24h Change</span>
								<div className="text">
									<span className="emp">0.001500</span>
									<span className="small">$53.41</span>
								</div>
							</div>
							<div className="cell chg">
								<img src="./img/growth.png" alt="home" />
								<p>
									<span className="emp">+4,42</span> <span>%</span>
								</p>
								<div className="star js-star">
									<i className="fa fa-star-o" aria-hidden="true" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PairDrop;
