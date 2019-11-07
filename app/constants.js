let env = 'dev';

let URL_SOCKET = '';
let orionUrl = '';

if (window.location.hostname !== 'localhost') env = 'prod';

if (env === 'prod') {
	URL_SOCKET = `https://${window.location.hostname}:2083`;
	orionUrl = `https://${window.location.hostname}/wanchain`;
} else if (env === 'dev') {
	URL_SOCKET = 'http://localhost:3002';
	orionUrl = `http://${window.location.hostname}:3001`;
}

// orionUrl = `https://demo.orionprotocol.io/wanchain`;

module.exports = {
	URL_SOCKET,
	orionUrl
};
