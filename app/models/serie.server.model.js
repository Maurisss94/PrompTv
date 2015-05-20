'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Serie Schema
 */
var SerieSchema = new Schema({
	// Serie model fields   
	// ...
    idm:{
        type: Number,
        required: true,
        unique: true
    },
    imdb:{
        type: String,
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
    }]
    
});

mongoose.model('Serie', SerieSchema);
