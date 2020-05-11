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
const demo = require('simplicite').session({
	url: process.env.SIMPLICITE_URL || 'https://demo.dev.simplicite.io',
	username: process.env.SIMPLICITE_USERNAME || 'website',
	password: process.env.SIMPLICITE_PASSWORD || 'simplicite',
	debug: debug
});
if (debug) console.log(demo.parameters);

demo.login().then(res => {
	const express = require('express');
	const app = express();
	app.use(express.static(__dirname + '/public'));
	app.set('view engine', 'pug');
	app.set('views', __dirname + '/views');

	const product = demo.getBusinessObject('DemoProduct');

	app.get('/', (req, res) => {
		if (debug) console.log('Home page requested');
		headers(res);
		product.search(null, { inlineDocuments: [ 'demoPrdPicture' ] }).then(list => {
			if (debug) console.log(list.length + ' products loaded');
			res.render('index', { products: JSON.stringify(list) });
		});
	});

	app.get('/user', (req, res) => {
		if (debug) console.log('User page requested');
		headers(res);
		demo.getGrant({ inlinePicture: true }).then(grant => {
			if (debug) console.log(grant.login + ' loaded');
			res.render('user', { grant: JSON.stringify(grant) });
		});
	});

	const args = process.argv.slice(2);
	const serverHost = process.env.VCAP_APP_HOST || args[0] || 'localhost';
	const serverPort = process.env.VCAP_APP_PORT || args[1] || 3000;

	app.listen(parseInt(serverPort), serverHost);
	if (debug) console.log('Server listening on ' + serverHost + ':' + serverPort);
}).catch(err => {
	console.err(err);
});
