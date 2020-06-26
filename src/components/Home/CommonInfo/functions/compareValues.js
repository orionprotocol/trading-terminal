/* LOWER TO HIGHEST */
export  function compareValuesLTH(name, sortType, lines) {

	switch (sortType) {
		/* All those sortings are from less to more (asc) */
		case 'letter':
			return lines.sort(function (a, b) {
				if (a[name] > b[name]) {
					return 1;
				}
				if (a[name] < b[name]) {
					return -1;
				}
				return 0;
			})
		case 'number':
			return lines.sort(function (a, b) {
			/* 	console.log(` ${a[name]} - ${b[name]}:  ` , a[name] - b[name]) */
				return a[name] - b[name];
			})
		default:
			break;
	}
}

/*  HIGHEST TO LOWER */
export  function compareValuesHTL(name, sortType, lines) {

	switch (sortType) {
		/* All those sortings are from high to less (asc) */
		case 'letter':
			return lines.sort(function (a, b) {
				if (a[name] < b[name]) {
					return 1;
				}
				if (a[name] > b[name]) {
					return -1;
				}
				return 0;
			})
		case 'number':
			return lines.sort(function (a, b) {
				/* console.log(` ${a[name]} - ${b[name]}:  ` , a[name] - b[name]) */
				return b[name] - a[name];
			})
		default:
			break;
	}
}

