import React, { Fragment } from 'react';

import start from '../../../style/media/star.png';
import arrow from '../../../style/media/arrow-down.svg';
import search from '../../../style/media/search.svg';
import star from '../../../style/media/star.png';
import DataTableCommonInfo from './dinamicTable';

const Modal = ({ arrowStyle, setArrowStyle, currencyModal, setCurrencyModal }) => {
	// console.log(arrowStyle,currencyModal)

	const changeActiveButton = key => {
		let array = [];
		for (let x = 0; x < 5; x++) {
			if (x === key) {
				array.push('buttons active');
			} else {
				array.push('buttons');
			}
		}

		setCurrencyModal({ ...currencyModal, selection: array });
	};

	return (
		<Fragment>
			<div className="common-info-top black-screen-selector">
				<div className="common-info-top-left black-screen-selector">
					<img src={start} alt="" />
					<span style={{ marginLeft: '7px', color: '#514E61' }}>PAIR</span>
				</div>
				<div className="common-info-top-rigth black-screen-selector">
					<div
						style={{ cursor: 'pointer' }}
						onClick={() => setArrowStyle({ arrow: 'common-info-arrow down', modal: 'none' })}
					>
						<span style={{ fontSize: '16px', color: 'rgba(20,16,41,0.8)', fontWeight: '600' }}>
							{currencyModal.selection[0] === 'buttons active' && currencyModal.selector[0]}
							{currencyModal.selection[1] === 'buttons active' && currencyModal.selector[1]}
							{currencyModal.selection[2] === 'buttons active' && currencyModal.selector[2]}
							{currencyModal.selection[3] === 'buttons active' && currencyModal.selector[3]}
							{currencyModal.selection[4] === 'buttons active' && currencyModal.selector[4]}
						</span>
						<img src={arrow} className={arrowStyle.arrow} alt="" />
					</div>
				</div>
			</div>
			<div className="content-modal">
				<div className="content-modal-top">
					<span className={currencyModal.selection[0]} onClick={() => changeActiveButton(0)}>
						BTC
					</span>
					<span className={currencyModal.selection[1]} onClick={() => changeActiveButton(1)}>
						USD
					</span>
					<span className={currencyModal.selection[2]} onClick={() => changeActiveButton(2)}>
						ETH
					</span>
					<span className={currencyModal.selection[3]} onClick={() => changeActiveButton(3)}>
						NEO
					</span>
					<span className={currencyModal.selection[4]} onClick={() => changeActiveButton(4)}>
						EOS
					</span>
				</div>
				<div className="content-modal-top-two">
					<div className="content-modal-input-search-div">
						<img src={search} className="img-search" alt="" />
						<input type="text" placeholder="Search pair" className="content-modal-input-search" />
					</div>

					<div className="content-modal-favourite">
						<img src={star} alt="" />
						<span style={{ marginLeft: '10px', fontWeight: '600' }}>Favourites</span>
					</div>
				</div>

				<div className="content-modal-table">
					<DataTableCommonInfo />
				</div>
			</div>

			{/* BLACK SCREEN */}
			<div
				className="black-screen"
				onClick={() => setArrowStyle({ arrow: 'common-info-arrow down', modal: 'none' })}
			/>
			{/* BLACK SCREEN */}
		</Fragment>
	);
};

export default Modal;
