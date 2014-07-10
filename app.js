var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);

var simpliciteHost = process.env.SIMPLICITE_HOST || 'simplicite-demo.mybluemix.net';
var simplicitePort = process.env.SIMPLICITE_POST || 80;
var simpliciteRoot = process.env.SIMPLICITE_ROOT || '';

var demo = require('simplicite').session({ debug: false, host: simpliciteHost, port: simplicitePort, root: simpliciteRoot })

var prd = demo.getBusinessObject("DemoProduct");

// Promise approach
/*
var Q = require('q');
app.get('/', function(req, res) {
	(function(filters, params) {
		var d = Q.defer();
		prd.search(function(list) { d.resolve(list); }, filters, params);
		return d.promise;
	})(undefined, { inlineDocs: true }).then(function(list) {
		console.log(list.length + " products loaded !");
		res.render('index', { products: JSON.stringify(list), });
	});
});
*/

// Callback approach
app.get('/', function(req, res) {
	prd.search(function(list) {
		console.log(list.length + " products loaded !");
		res.render('index', { products: JSON.stringify(list), });
	}, undefined, { inlineDocs: true });
});

app.get('/grant', function(req, res) {
	demo.getGrant(function(news) {
		res.render('grant', { grant: JSON.stringify(demo.grant), });
	});
});

app.listen(port, host);
