import React from 'react';

const exchangesImg = props => {
	return <img style={props.style} className={props.className} src={props.imagePath} alt={props.alt} />;
};

export default exchangesImg;
