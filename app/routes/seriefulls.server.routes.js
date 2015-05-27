'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var seriefulls = require('../../app/controllers/seriefulls.server.controller');

	// Seriefulls Routes


	app.route('/seriefulls/:seriefullId')
		.get(seriefulls.read)
		.put(users.requiresLogin, seriefulls.hasAuthorization, seriefulls.update)
		.delete(users.requiresLogin, seriefulls.hasAuthorization, seriefulls.delete);

	// Finish by binding the Seriefull middleware
	app.param('seriefullId', seriefulls.seriefullByID);
};
