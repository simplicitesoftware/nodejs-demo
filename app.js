/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
'use strict';

import simplicite from 'simplicite';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

function headers(res) {
	res.header('Cache-Control', 'private, no-cache, no-store, no-transform, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
}

const app = simplicite.session({
	url: process.env.SIMPLICITE_URL || 'https://demo.dev.simplicite.io',
	username: process.env.SIMPLICITE_USERNAME || 'website',
	password: process.env.SIMPLICITE_PASSWORD || 'simplicite',
	debug: false
});

app.info(`Version: ${simplicite.constants.MODULE_VERSION}`);
app.debug(app.parameters);

try {
	const user = await app.login();
	app.debug("Logged in as " + user.login);

	const args = process.argv.slice(2);
	const serverHost = process.env.VCAP_APP_HOST || args[0] || 'localhost';
	const serverPort = process.env.VCAP_APP_PORT || parseInt(args[1]) || 3000;

	const server = express();
	server.disable("x-powered-by");
	const dir = dirname(fileURLToPath(import.meta.url));
	server.use(express.static(dir + '/public'));
	server.set('view engine', 'pug');
	server.set('views', dir + '/views');

	const product = app.getBusinessObject('DemoProduct');

	server.get('/', async (req, res) => {
		app.debug('Home page requested');
		headers(res);
		try {
			const list = await product.search(null, { inlineDocuments: [ 'demoPrdPicture' ] });
			app.debug(list.length + ' products loaded');
			res.render('index', { version: simplicite.constants.MODULE_VERSION, products: JSON.stringify(list) });
		} catch (err) {
			app.error(err);
			res.render('index', { error: err.message });
		}
	});

	server.get('/user', async (req, res) => {
		app.debug('User page requested');
		headers(res);
		try {
			const grant = await app.getGrant({ inlinePicture: true });
			app.debug(grant.login + ' loaded');
			res.render('user', { grant: JSON.stringify(grant) });
		} catch (err) {
			app.error(e);
			res.render('user', { error: err.message });
		}
	});

	server.listen(parseInt(serverPort), serverHost);
	app.info('Server listening on ' + serverHost + ':' + serverPort);
} catch (err) {
	app.log(err);
}
