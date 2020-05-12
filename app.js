/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
'use strict';

function headers(res) {
	res.header('Cache-Control', 'private, no-cache, no-store, no-transform, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
}

const debug = false;
const app = require('simplicite').session({
	url: process.env.SIMPLICITE_URL || 'https://demo.dev.simplicite.io',
	username: process.env.SIMPLICITE_USERNAME || 'website',
	password: process.env.SIMPLICITE_PASSWORD || 'simplicite',
	debug: debug
});
app.debug(app.parameters);

app.login().then(res => {
	const args = process.argv.slice(2);
	const serverHost = process.env.VCAP_APP_HOST || args[0] || 'localhost';
	const serverPort = process.env.VCAP_APP_PORT || parseInt(args[1]) || 3000;

	const express = require('express');
	const server = express();
	server.use(express.static(__dirname + '/public'));
	server.set('view engine', 'pug');
	server.set('views', __dirname + '/views');

	const product = app.getBusinessObject('DemoProduct');

	server.get('/', (req, res) => {
		app.debug('Home page requested');
		headers(res);
		product.search(null, { inlineDocuments: [ 'demoPrdPicture' ] }).then(list => {
			app.debug(list.length + ' products loaded');
			res.render('index', { products: JSON.stringify(list) });
		});
	});

	server.get('/user', (req, res) => {
		app.debug('User page requested');
		headers(res);
		app.getGrant({ inlinePicture: true }).then(grant => {
			app.debug(grant.login + ' loaded');
			res.render('user', { grant: JSON.stringify(grant) });
		});
	});

	server.listen(parseInt(serverPort), serverHost);
	app.info('Server listening on ' + serverHost + ':' + serverPort);
}).catch(err => {
	app.error(err);
});
