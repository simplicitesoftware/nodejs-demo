'use strict';

function headers(res) {
	res.header('Cache-Control', 'private, no-cache, no-store, no-transform, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
}

const demo = require('simplicite').session({
	url: process.env.SIMPLICITE_BASEURL || 'https://demo.dev.simplicite.io',
	username: process.env.SIMPLICITE_USERNAME || 'website',
	password: process.env.SIMPLICITE_PASSWORD || 'simplicite',
	debug: false
});

const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

let product = demo.getBusinessObject('DemoProduct');

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

const args = process.argv.slice(2);
const serverHost = process.env.VCAP_APP_HOST || args[0] || 'localhost';
const serverPort = process.env.VCAP_APP_PORT || args[1] || 3000;

app.listen(parseInt(serverPort), serverHost);
console.log('Server listening on ' + serverHost + ':' + serverPort);
