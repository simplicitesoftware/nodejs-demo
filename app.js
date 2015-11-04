var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "jade");
app.set("views", __dirname + "/views");

var host = (process.env.VCAP_APP_HOST || "localhost");
var port = (process.env.VCAP_APP_PORT || 3000);

var params = {
	host: process.env.SIMPLICITE_HOST || "demo.apps.simplicite.io",
	port: process.env.SIMPLICITE_POST || 80,
	root: process.env.SIMPLICITE_ROOT || "",
	user: process.env.SIMPLICITE_USER || "admin",
	password: process.env.SIMPLICITE_PASSWORD || "admin",
	debug: true
};
var demo = require("simplicite").session(params);

var prd = demo.getBusinessObject("DemoProduct");

app.get("/", function(req, res) {
	prd.search(undefined, { inlineDocs: true }).then(function(list) {
		console.log(list.length + " products loaded !");
		res.render("index", { products: JSON.stringify(list), });
	});
});

app.get("/grant", function(req, res) {
	demo.getGrant({ inlinePicture: true }).then(function(grant) {
		res.render("grant", { grant: JSON.stringify(grant), });
	});
});

app.get("/health", function(req, res) {
	demo.getHealth().then(function(health) {
		res.render("health", health);
	});
});

console.log("Server started");
app.listen(port, host);
