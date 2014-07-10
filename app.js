var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "jade");
app.set("views", __dirname + "/views");

var host = (process.env.VCAP_APP_HOST || "localhost");
var port = (process.env.VCAP_APP_PORT || 3000);

var params = {
	host: process.env.SIMPLICITE_HOST || "localhost",
	port: process.env.SIMPLICITE_POST || 8080,
	root: process.env.SIMPLICITE_ROOT || "demows",
	user: process.env.SIMPLICITE_USER || "admin",
	password: process.env.SIMPLICITE_PASSWORD || "admin",
	debug: false
};
var demo = require("simplicite").session(params);

var prd = demo.getBusinessObject("DemoProduct");

// Promise approach
/*
var Q = require("q");
app.get("/", function(req, res) {
	(function(filters, params) {
		var d = Q.defer();
		prd.search(function(list) { d.resolve(list); }, filters, params);
		return d.promise;
	})(undefined, { inlineDocs: true }).then(function(list) {
		console.log(list.length + " products loaded !");
		res.render("index", { products: JSON.stringify(list), });
	});
});
*/

// Callback approach
app.get("/", function(req, res) {
	prd.search(function(list) {
		console.log(list.length + " products loaded !");
		res.render("index", { products: JSON.stringify(list), });
	}, undefined, { inlineDocs: true });
});

app.get("/grant", function(req, res) {
	demo.getGrant(function(news) {
		res.render("grant", { grant: JSON.stringify(demo.grant), });
	}, { inlinePicture: true });
});

console.log("Server started");
app.listen(port, host);
