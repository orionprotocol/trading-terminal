const orionUrl = 'http://localhost:3001';

const getBalances = address =>
	new Promise((resolve, reject) => {
		fetch(`${orionUrl}/api/balance/${address}`)
			.then(results => {
				return results.json();
			})
			.then(data => {
				console.log('balances: ', data);
				resolve(data);
			})
			.catch(err => reject(err));
	});

module.exports = {
	getBalances
};
