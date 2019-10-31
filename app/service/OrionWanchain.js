import { orionUrl } from '../constants.js';

const getBalances = address =>
	new Promise((resolve, reject) => {
		fetch(`${orionUrl}/api/balance/${address}`)
			.then(results => {
				return results.json();
			})
			.then(data => {
				resolve(data);
			})
			.catch(err => reject(err));
	});

module.exports = {
	getBalances
};
