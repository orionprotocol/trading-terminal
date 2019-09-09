import React from 'react';

class ProgressBar extends React.Component {
	render() {
		const parent = this.props;

		return (
			<div className="custom-progress-bar">
				<div className="value">
					<div style={{ color: parent.reading.color, width: '5%' }}>
						<span>{parent.reading.value}%</span>
					</div>
				</div>
				<div className="bar">
					<div style={{ backgroundColor: parent.reading.color, width: parent.reading.value + '%' }} />
					<div style={{ backgroundColor: '#d3d3d3', width: 100 - parent.reading.value + '%' }} />
				</div>
			</div>
		);
	}
}

export default ProgressBar;
