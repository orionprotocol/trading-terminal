export function Dark() {
	const body = document.querySelector('body');
	body.classList.add('dark');

	body.style.background = 'rgba(20, 16, 41, 0.02)';

	const moon = document.querySelector('#moon');
	if (moon) moon.classList.add('active');

	const toggle = document.querySelector('.index');
	if (toggle) toggle.classList.add('dark-mode');

	const toggle2 = document.querySelector('.toggler.js-toggler-dark-mode');
	if (toggle2) toggle2.classList.add('active');

	const orders = document.querySelector('.father.orders');
	if (orders) orders.classList.add('dark-mode');

	const exchange = document.querySelector('#exchange');
	if (exchange) exchange.classList.add('dark-mode');

	const dashboard = document.querySelector('.dashboard');
	if (dashboard) dashboard.classList.add('dark-mode');

	const btns = document.getElementsByClassName('price-card-button');
	if (btns && btns.length > 0) {
		for (let i = 0; i < btns.length; i++) {
			btns[i].classList.add('dark-mode');
		}
	}

	const dates = document.querySelectorAll('.orders-dates .date');

	if (dates && dates.length > 0) {
		for (let i = 0; i < dates.length; i++) {
			dates[i].classList.add('dark-mode');
		}
	}

	const selects = document.querySelectorAll('.price-card-selector');
	if (selects && selects.length > 0) {
		for (let i = 0; i < selects.length; i++) {
			selects[i].classList.add('dark-mode');
		}
	}
	const history = document.querySelector('.history');
	if (history) {
		history.classList.add('dark-mode');
	}
}

export function Light() {
	document.querySelector('body').classList.remove('dark');

	const moon = document.querySelector('#moon');
	if (moon) moon.classList.remove('active');

	const toggle = document.querySelector('.index');
	if (toggle) toggle.classList.remove('dark-mode');

	const toggle2 = document.querySelector('.toggler.js-toggler-dark-mode');
	if (toggle2) toggle2.classList.remove('active');

	const orders = document.querySelector('.father.orders');
	if (orders) orders.classList.remove('dark-mode');

	const exchange = document.querySelector('#exchange');
	if (exchange) exchange.classList.remove('dark-mode');

	const dashboard = document.querySelector('.dashboard');
	if (dashboard) dashboard.classList.remove('dark-mode');

	const btns = document.getElementsByClassName('price-card-button');
	if (btns && btns.length > 0) {
		for (let i = 0; i < btns.length; i++) {
			btns[i].classList.remove('dark-mode');
		}
	}

	const dates = document.querySelectorAll('.orders-dates .date');
	if (dates && dates.length > 0) {
		for (let i = 0; i < dates.length; i++) {
			dates[i].classList.remove('dark-mode');
		}
	}

	const selects = document.querySelectorAll('.price-card-selector');
	if (selects && selects.length > 0) {
		for (let i = 0; i < selects.length; i++) {
			selects[i].classList.remove('dark-mode');
		}
	}

	const history = document.querySelector('.history');
	if (history) {
		history.classList.remove('dark-mode');
	}
}

// export { Dark, Light };
