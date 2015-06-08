'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Model Preferit amb les seves propietats.
 */
var PreferitSchema = new Schema({
	idm: {
		type: Number
	},
	nom: {
		type: String
	},
	imatge: {
		type: String
	},
	temporades: {
		type: Number
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	seriefull: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'seriefull'
	}
});

mongoose.model('Preferit', PreferitSchema);
