'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Seriefull Schema
 */
var SeriefullSchema = new Schema({

	idm: {
		type:Number,
		required: true,
		unique: true
	},
	imdb: {
		type: String
	},
	nota: {
		type: Number
	},
	nom: {
		type: String
	},
	imatge: {
		type: String
	},
	backdrop: {
		type: String
	},
	any: {
		type: Number
	},
	episodis: {
		type: Number
	},
	temporades: {
		temp: [{
			nom: {
				type: String
			},
			temporada: {
				type: Number
			},
			num_Capitol: {
				type: String
			}
		}]
	},
	descripcio: {
		type: String
	},
	casting: [{
		nom: {
			type: String
		},
		rol: {
			type: String
		},
		foto: {
			type: String
		}
	}],
	directors: [{
		nom: {
			type: String
		},
		rol: {
			type: String
		}
	}],
	durada: {
		type: String
	},
	idioma: [{
		nom: {
			type: String
		}
	}],
	pais: [{
		nom: {
			type: String
		}
	}],
	genere: [{
		nom: {
			type: String
		}
	}],
	num_temporades: {
		type:Number
	}
});

mongoose.model('Seriefull', SeriefullSchema);
