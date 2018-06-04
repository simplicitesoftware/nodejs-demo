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

var demo = require('simplicite').session({
	url: process.env.SIMPLICITE_BASEURL || 'https://demo.dev.simplicite.io',
	username: process.env.SIMPLICITE_USERNAME || 'website',
	password: process.env.SIMPLICITE_PASSWORD || 'simplicite',
	debug: false
});

demo.login().then(function(params) {
	var express = require('express');
	var app = express();
	app.use(express.static(__dirname + '/public'));
	app.set('view engine', 'pug');
	app.set('views', __dirname + '/views');

	var product = demo.getBusinessObject('DemoProduct');

	app.get('/', function(req, res) {
		console.log('Home page requested');
		headers(res);
		product.search(null, { inlineThumbs: true }).then(function(list) {
			console.log(list.length + ' products loaded !');
			res.render('index', { products: JSON.stringify(list), });
		});
	});

	app.get('/user', function(req, res) {
		console.log('User page requested');
		headers(res);
		demo.getGrant({ inlinePicture: true }).then(function(grant) {
			res.render('user', { grant: JSON.stringify(grant), });
		});
	});

	var args = process.argv.slice(2);
	var serverHost = process.env.VCAP_APP_HOST || args[0] || 'localhost';
	var serverPort = process.env.VCAP_APP_PORT || args[1] || 3000;

	app.listen(parseInt(serverPort), serverHost);
	console.log('Server listening on ' + serverHost + ':' + serverPort);
}).fail(function(reason) {
	console.log('ERROR: Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
});
