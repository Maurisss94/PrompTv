'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var llistaseries = require('../../app/controllers/llistaseries.server.controller');

	// Llistaseries Routes
	app.route('/llistaseries/paginate/:page/:total')
		.get(llistaseries.paginate);
	app.route('/llistaseries')
		.get(llistaseries.list)
		.post(users.requiresLogin, llistaseries.create);

	app.route('/llistaseries/:llistaserieId')
		.get(llistaseries.read)
		.put(users.requiresLogin, llistaseries.hasAuthorization, llistaseries.update)
		.delete(users.requiresLogin, llistaseries.hasAuthorization, llistaseries.delete);

	// Finish by binding the Llistaserie middleware
	app.param('llistaserieId', llistaseries.llistaserieByID);

	/**
	 * Carrega token, i info de la api de tviso.
	 */
	app.route('/carregar')
		.get(llistaseries.recull, llistaseries.hasAuthorization);

};
