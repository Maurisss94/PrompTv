'use strict';

var serie = require('../../app/controllers/serie.server.controller');

module.exports = function(app) {
	// Routing logic   
	// ...
    app.route('/carregar')
		.get(serie.recull);
};