"use strict";

var params = {
	url: process.env.VCAP_SIMPLICITE_URL || 'http://demo.apps.simplicite.io',
	user: process.env.VCAP_SIMPLICITE_USER || 'admin',
	password: process.env.VCAP_SIMPLICITE_PASSWORD || 'admin',
	debug: true
};
var demo = require('simplicite').session(params);

var product = demo.getBusinessObject('DemoProduct');

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

var args = process.argv.slice(2);
var serverHost = process.env.VCAP_APP_HOST || args[0] || 'localhost';
var serverPort = process.env.VCAP_APP_PORT || args[1] || 3000;

app.get('/', function(req, res) {
	res.header('Cache-Control', 'private, no-cache, no-store, no-transform, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	console.log('Home page requested');
	product.search(undefined, { inlineDocs: true }).then(function(list) {
		console.log(list.length + ' products loaded !');
		res.render('index', { products: JSON.stringify(list), });
	});
});

app.get('/user', function(req, res) {
	res.header('Cache-Control', 'private, no-cache, no-store, no-transform, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	console.log('User page requested');
	demo.getGrant({ inlinePicture: true }).then(function(grant) {
		res.render('user', { grant: JSON.stringify(grant), });
	});
});

app.listen(parseInt(serverPort), serverHost);
console.log('Server listening on ' + serverHost + ':' + serverPort);