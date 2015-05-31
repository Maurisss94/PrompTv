'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

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
LlistaserieSchema.plugin(mongoosePaginate);
mongoose.model('Llistaserie', LlistaserieSchema);

