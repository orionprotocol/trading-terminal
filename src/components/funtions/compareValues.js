export default function compareValues(key, order = 'asc') {
	return function(a, b) {
		if (key === 'total') {
			a['total'] = (a.price * a.orderQty).toFixed(8);
			b['total'] = (b.price * b.orderQty).toFixed(8);
		}

		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			// property doesn't exist on either object
			return 0;
		}

		const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
		const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
		let comparison = 0;
		if (varA > varB) {
			comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return order === 'desc' ? comparison * -1 : comparison;
	};
}
