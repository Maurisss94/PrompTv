'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Seriefull = mongoose.model('Seriefull'),
	_ = require('lodash');

/**
 * Create a Seriefull
 */
exports.create = function(req, res) {
	var seriefull = new Seriefull(req.body);
	seriefull.user = req.user;

	seriefull.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(seriefull);
		}
	});
};

/**
 * Show the current Seriefull
 */
exports.read = function(req, res) {
	res.jsonp(req.seriefull);
};

/**
 * Update a Seriefull
 */
exports.update = function(req, res) {
	var seriefull = req.seriefull ;

	seriefull = _.extend(seriefull , req.body);

	seriefull.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(seriefull);
		}
	});
};

/**
 * Delete an Seriefull
 */
exports.delete = function(req, res) {
	var seriefull = req.seriefull ;

	seriefull.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(seriefull);
		}
	});
};

/**
 * List of Seriefulls
 */
exports.list = function(req, res) { 
	Seriefull.find().sort('-created').populate('user', 'displayName').exec(function(err, seriefulls) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(seriefulls);
		}
	});
};

/**
 * Seriefull middleware
 */
exports.seriefullByID = function(req, res, next, id) { 
	Seriefull.findById(id).populate('user', 'displayName').exec(function(err, seriefull) {
		if (err) return next(err);
		if (! seriefull) return next(new Error('Failed to load Seriefull ' + id));
		req.seriefull = seriefull ;
		next();
	});
};

/**
 * Seriefull authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.seriefull.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
