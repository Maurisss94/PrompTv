'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Preferit = mongoose.model('Preferit'),
	FullSerie = mongoose.model('Seriefull'),
	_ = require('lodash');

/**
 * Metode que crea un preferit amb el seu usuari corresponent.
 */
exports.create = function(req, res) {
	var preferit = new Preferit(req.body);
	preferit.user = req.user;

	FullSerie.find({'nom': preferit.nom}, function(err,fs){
		if (err) {
			console.log(errorHandler.getErrorMessage(err));
		} else {
			preferit.seriefull = fs[0]._id;
			preferit.save(function(err) {
					if (err) {
						console.log('error');
						console.log(errorHandler.getErrorMessage(err));
					}else{
						res.jsonp(preferit);
					}
				}
			);
		}
	})

};

/**
 * Show the current Preferit
 */
exports.read = function(req, res) {
	res.jsonp(req.preferit);
};

/**
 * Update a Preferit
 */
exports.update = function(req, res) {
	var preferit = req.preferit ;

	preferit = _.extend(preferit , req.body);

	preferit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(preferit);
		}
	});
};

/**
 * Delete an Preferit
 */
exports.delete = function(req, res) {
	var preferit = req.preferit ;

	preferit.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(preferit);
		}
	});
};

/**
 * Llista dels preferits filtrar només per l'usuari que esta connectat.
 */
exports.list = function(req, res) {
	var currentUser = req.session.passport.user;
	Preferit.find({user : currentUser}).sort('-created').populate('user', 'displayName').exec(function(err, preferits) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(preferits);
		}
	});
};

/**
 * Preferit middleware
 */
exports.preferitByID = function(req, res, next, id) { 
	Preferit.findById(id).populate('user', 'displayName').exec(function(err, preferit) {
		if (err) return next(err);
		if (! preferit) return next(new Error('Failed to load Preferit ' + id));
		req.preferit = preferit ;
		next();
	});
};

/**
 * Preferit authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.preferit.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
