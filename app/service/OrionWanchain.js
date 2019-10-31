const orionUrl = `https://${window.location.hostname}/wanchain`;

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
