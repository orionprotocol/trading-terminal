import React from 'react'

const IndexNav = _ => {
    return (
        <div className="index-nav">
				<div className="index-nav-item active js-index-nav" data-nav="pair">
					<div className="icon">
						<span className="icon-mobile-1" />
					</div>
					<div className="text">Pair</div>
				</div>
				<div className="index-nav-item js-index-nav" data-nav="exchange">
					<div className="icon">
						<span className="icon-mobile-2" />
					</div>
					<div className="text">Exchange</div>
				</div>
				<div className="index-nav-item js-index-nav" data-nav="chart">
					<div className="icon">
						<span className="icon-mobile-3" />
					</div>
					<div className="text">Chart</div>
				</div>
				<div className="index-nav-item js-index-nav" data-nav="history">
					<div className="icon">
						<span className="icon-mobile-4" />
					</div>
					<div className="text">History</div>
				</div>
				<div className="index-nav-item js-index-nav" data-nav="orderbook">
					<div className="icon">
						<span className="icon-mobile-5" />
					</div>
					<div className="text">Orderbook</div>
				</div>
			</div>
    )
}

export default IndexNav