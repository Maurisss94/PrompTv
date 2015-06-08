'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var preferits = require('../../app/controllers/preferits.server.controller');

	// Ruta de la api per veure els teus preferits.
	app.route('/preferits')
		.get(users.requiresLogin,  preferits.list)
		.post(users.requiresLogin, preferits.create);

	// Finish by binding the Preferit middleware
	app.param('preferitId', preferits.preferitByID);
};
