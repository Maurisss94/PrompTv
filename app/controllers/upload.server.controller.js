'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');
var Usuari = mongoose.model('User');
var mongoose = require('mongoose');
var path = require('path');

/**
 * Metode que fa el post del usuari amb el camp de la imatge afegit.
 */
exports.create = function(req, res) {
    /**
     * Busquem l'usuari amb el passport.
     */
    var currentUser = req.session.passport.user;
    /**
     * Transformem la variable currentUser a ObjectId perque el mongo ho entengui.
     */
    var id= mongoose.Types.ObjectId(currentUser);

    Usuari.findOneAndUpdate({'_id':id},{'img': req.files.image.name},function(err) {
        if (err) {
            console.log(err);
        }else{
            console.log('POST de la imatge fet');
        }

    });

};

/**
 * Show the current Upload
 */
exports.read = function(req, res) {

};

/**
 * Update a Upload
 */
exports.update = function(req, res) {

};

/**
 * Delete an Upload
 */
exports.delete = function(req, res) {

};

/**
 * Llista de les imatges del usuari.
 */
exports.list = function(req, res) {
    var currentUser = req.session.passport.user;
    var id= mongoose.Types.ObjectId(currentUser);

    Usuari.findById(id, function(err, img){
        if(err){
            console.log(err);
        }else{
            var options = {
                root: __dirname + '/../../public/modules/users/css/imatges',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };

            var filename = img.img;
            res.sendFile(filename, options, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('Enviat :' + filename);
                }
            })
        }
    })



};