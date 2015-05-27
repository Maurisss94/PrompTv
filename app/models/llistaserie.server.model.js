'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Llistaserie Schema
 */
var LlistaserieSchema = new Schema({
	idm:{
		type: Number,
		required: true,
		unique: true
	},
	imdb:{
		type: String
	},
	nota:{
		type: Number
	},
	nom:{
		type: String
	},
	any:{
		type: Number
	},
	temporades:{
		type: Number
	},
	descripcio:{
		type: String
	},
	canals:[{
		id:{
			type:String
		},
		nom:{
			type:String
		}
	}],
	imatge:{
		type: String
	},
	seriefull: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'seriefull'
	}
});

mongoose.model('Llistaserie', LlistaserieSchema);