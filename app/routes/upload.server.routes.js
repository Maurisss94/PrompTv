'use strict';

module.exports = function(app) {

    var upload  = require('../../app/controllers/upload.server.controller');
    /**
     * Ruta on es fa el post de la imatge del user.
     */
    app.route('/upload')
        .post(upload.create);

    /**
     * Ruta que recupera la imatge del usuari.
     */
    app.route('/imatge')
        .get(upload.list);
};