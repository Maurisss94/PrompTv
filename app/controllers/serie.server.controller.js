'use strict';

var Serie = require('../models/serie.server.model');
var errorHandler = require('./errors.server.controller');
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

var Serie = mongoose.model('Serie'),
    _ = require('lodash');

var https = require('https');

/**
* Funcio que obte el token de la api.
*/
function obtenirToken(req, res, callback) {

    var url = {
        'host': 'api.tviso.com',
        'path': '/auth_token?id_api=3344&secret=5rwAZHZHRWevqyqtreUR',
    }

    var text= '';
    var tokenParse = '';
    var token = '';

    var callback2 = function(response) {

        response.on('data', function(chunk) {
            text += chunk;
        });

        response.on('end', function() {
            tokenParse = JSON.parse(text);
            token = tokenParse.auth_token;
            console.log(token);
            callback(req, res, token);
            return token;
        });


    }

    var req3 = https.request(url, callback2).end();

}

/*
 * Funcio que recupera una col·leccio amb les SERIES.
 */
function getSerie(req, res, tok) {

    var opt = {
        'host': 'api.tviso.com',
        'path': '/media/browse?auth_token=' + tok + '&mediaType=1-Serie'
    }


    var str = '';

    var callback = function(response) {

        /**
        * Va emmagatzeman el string que retorna la peticio a la api.
        */
        response.on('data', function(chunk) {
            str += chunk;
        });

        /**
        * Quan acabi podrem processar les dades i pasarles a json.
        */
        response.on('end', function() {

                var parser = '';
                parser = JSON.parse(str);
                var aux = [];

                function carregar() {
                    for (var i = 0; i < parser.results.medias.length; i++) {
                        if (parser.results.medias[i].schedule_summary != undefined) {
                            aux = [];
                            for (var j = 0; j < parser.results.medias[i].schedule_summary.length; j++) {
                                aux.push({
                                    id: parser.results.medias[i].schedule_summary[j].id,
                                    nom: parser.results.medias[i].schedule_summary[j].name
                                });
                            }

                        }
                        /**
                        * Creem una serie amb els parametres del json.
                        */
                        var novaSerie = new Serie({
                            idm: parser.results.medias[i].idm,
                            idmb: parser.results.medias[i].idmb,
                            nota: parser.results.medias[i].rating,
                            nom: parser.results.medias[i].name,
                            any: parser.results.medias[i].year,
                            temporades: parser.results.medias[i].seasons,
                            descripcio: parser.results.medias[i].plot,
                            canals: aux
                        });
                        /**
                        * Guardem les series al mongo.
                        */
                        novaSerie.save(function(err) {
                            if (err) {
                                console.log(errorHandler.getErrorMessage(err));
                            }
                        });


                    }
                }

            /**
            * Esborrem la col·lecció de Serie i la tornem a omplir.
            */
                Serie.remove({}, carregar);

                res.status(200).send();
            }

        );
    }


    var req2 = https.request(opt, callback).end();



}

exports.recull = function(req, res) {
    obtenirToken(req, res, getSerie);
}
/**
 * Create a Serie
 */
exports.create = function(req, res) {

};

/**
 * Show the current Serie
 */
exports.read = function(req, res) {

};

/**
 * Update a Serie
 */
exports.update = function(req, res) {

};

/**
 * Delete an Serie
 */
exports.delete = function(req, res) {

};

/**
 * List of Series
 */
exports.list = function(req, res) {

};
