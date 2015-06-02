'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Llistaserie = mongoose.model('Llistaserie'),
	_ = require('lodash');


var fullSerie = mongoose.model('Seriefull');

var https = require('https');
/**
 * Create a Llistaserie
 */
exports.create = function(req, res) {
	var llistaserie = new Llistaserie(req.body);
	llistaserie.user = req.user;

	llistaserie.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(llistaserie);
		}
	});
};

/**
 * Show the current Llistaserie
 */
exports.read = function(req, res) {
	res.jsonp(req.llistaserie);
};


exports.paginate = function(req,res) {
	console.log('++++++++++++++++++++++++++++++++++++++++');
	console.log(req.params);
	console.log('++++++++++++++++++++++++++++++++++++++++');
	Llistaserie.paginate({},req.params.page,req.params.total,function(err, llistaseries, paginatedResults, itemCount) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(paginatedResults);
		}
	});
}
/**
 * Update a Llistaserie
 */
exports.update = function(req, res) {
	var llistaserie = req.llistaserie ;

	llistaserie = _.extend(llistaserie , req.body);

	llistaserie.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(llistaserie);
		}
	});
};

/**
 * Delete an Llistaserie
 */
exports.delete = function(req, res) {
	var llistaserie = req.llistaserie ;

	llistaserie.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(llistaserie);
		}
	});
};

/**
 * List of Llistaseries
 */
exports.list = function(req, res) { 
	Llistaserie.find().sort('-created').populate('user', 'displayName').exec(function(err, llistaseries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(llistaseries);
		}
	});
};

/**
 * Llistaserie middleware
 */
exports.llistaserieByID = function(req, res, next, id) {
	console.log('id'+ id);
	Llistaserie.findById(id).populate('user', 'displayName').exec(function(err, llistaserie) {
		if (err) return next(err);
		if (! llistaserie) return next(new Error('Failed to load Llistaserie ' + id));
		req.llistaserie = llistaserie ;
		next();
	});
};

/**
 * Llistaserie authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.llistaserie.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};



/**
 * Funcio que obte el token de la api.
 */
function obtenirToken(req, res, callback) {

	var url = {
		'host': 'api.tviso.com',
		'path': '/auth_token?id_api=3344&secret=5rwAZHZHRWevqyqtreUR'
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

function fullInfo(idmF, token){


	var info = {
		'host': 'api.tviso.com',
		'path': '/media/full_info?auth_token='+token+'&idm='+idmF+'&mediaType=1-Serie&limit=48'
	}
	var txt ='';

	var callback3 = function(response){
		response.on('data', function (chunk) {
			txt += chunk;
		});
		response.on('end', function(){
			var parser2 = '';
			parser2 = JSON.parse(txt);

			var aux2 = [];


			function carregarFull() {



				var getLength = function(obj) {
					var i = 0, key;
					for (key in obj) {
						if (obj.hasOwnProperty(key)){
							i++;
						}
					}
					return i;
				};
				var llargada = getLength(parser2.seasons);



				if(parser2.seasons[llargada] != undefined) {

					for(var i=0;i<=llargada;i++){

						var llargada2 = getLength(parser2.seasons[i]);
						for(var j=0;j<llargada2;j++){
							aux2.push({
								nom:parser2.seasons[i][j].name,
								temporada:parser2.seasons[i][j].season,
								num_Capitol:parser2.seasons[i][j].num
							});
							//console.log("Nom: "+parser2.seasons[i][j].name);
							//console.log("Temporada: "+parser2.seasons[i][j].season);
							//console.log("Capitol: "+parser2.seasons[i][j].num);
						}
					}


				}
				var castingLlargada = getLength(parser2.cast);
				//console.log(castingLlargada);

				var aux3=[];
				for(var i= 0;i<castingLlargada;i++){
					//console.log(parser2.cast[i]);

					//console.log(parser2.cast[i].images.face);
					if(parser2.cast[i].images === undefined){
						aux3.push({
							nom: parser2.cast[i].name,
							rol: parser2.cast[i].role,
							foto: 'https://es.tviso.com/img/tviso-default-avatar.png'
						});
					}else {

						aux3.push({
							nom: parser2.cast[i].name,
							rol: parser2.cast[i].role,
							foto: 'https://img.tviso.com/XX/face/w60'+parser2.cast[i].images.face
						});
					}
				}

				var aux4= [];
				var directorLlargada = getLength(parser2.director);

				for(var i=0;i<directorLlargada;i++){
					aux4.push({
						nom: parser2.director[i].name,
						rol: parser2.director[i].role

					})
				}
				var aux5=[];
				var idiomaLlargada = getLength(parser2.languages);
				for(var i=0;i<idiomaLlargada;i++){
					aux5.push({
						nom: parser2.languages[i]
					});
				}
				var aux6=[];
				var paisLlargada = getLength(parser2.country);
				for(var i=0;i<paisLlargada;i++){
					aux6.push({
						nom: parser2.country[i]
					});
				}
				var aux7=[];
				var genereLlargada = getLength(parser2.genres);
				for(var i=0;i<genereLlargada;i++){
					aux7.push({
						nom: parser2.genres[i]
					});
				}



				var serieCompleta = new fullSerie({
					idm: idmF,
					imdb: parser2.imdb,
					nom: parser2.name,
					imatge: 'http://img.tviso.com/ES/poster/w200'+parser2.images.poster,
					backdrop: 'https://img.tviso.com/ES/backdrop/w600'+parser2.images.backdrop,
					any: parser2.year,
					temporades: {
						temp: aux2
					},
					descripcio: parser2.plot,
					casting: aux3,
					directors: aux4,
					durada: parser2.runtime,
					idioma: aux5,
					pais: aux6,
					genere: aux7,
					num_temporades: llargada

				});
				console.log(serieCompleta.imatge);


				serieCompleta.save(function (err,sc) {
					if (err) {
						console.log(errorHandler.getErrorMessage(err));
					}else{
						Llistaserie.findOneAndUpdate({'idm': idmF}, {'seriefull': sc._id},function(err) {
							if (err) {
								console.log(err);
							}

						});
					}

				});
			}

			carregarFull();

		});




	}


	var req4 = https.request(info, callback3).end();

}

/*
 * Funcio que recupera una col·leccio amb les SERIES.
 */
function getSerie(req, res, tok) {

	var opt = {
		'host': 'api.tviso.com',
		'path': '/media/browse?auth_token=' + tok + '&mediaType=1-Serie&limit=48'
	}


	var str = '';

	var callback = function (response) {

		/**
		 * Va emmagatzeman el string que retorna la peticio a la api.
		 */
		response.on('data', function (chunk) {
			str += chunk;
		});

		/**
		 * Quan acabi podrem processar les dades i pasarles a json.
		 */
		response.on('end', function () {
				var parser = '';
				parser = JSON.parse(str);
				var aux = [];

				//console.log(parser.results);
				function carregar() {
					for (var i = 0; i < parser.results.medias.length; i++) {
						//console.log(parser.results.medias[i]);
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
						var novaSerie = new Llistaserie({
							idm: parser.results.medias[i].idm,
							idmb: parser.results.medias[i].idmb,
							nota: parser.results.medias[i].rating,
							nom: parser.results.medias[i].name,
							any: parser.results.medias[i].year,
							temporades: parser.results.medias[i].seasons,
							descripcio: parser.results.medias[i].plot,
							canals: aux,
							imatge: 'http://img.tviso.com/ES/poster/w200' + parser.results.medias[i].images.poster,
							seriefull: null
						});

						console.log(novaSerie.nom);


						/**
						 * Guardem les series al mongo.
						 */
						novaSerie.save(function (err) {
							if (err) {
								console.log(errorHandler.getErrorMessage(err));
							}

						});

						fullInfo(novaSerie.idm, tok);
					}
				}

				/**
				 * Esborrem la col·lecció de Serie i la tornem a omplir.
				 */

				Llistaserie.remove({}, carregar);
				console.log("taula llistaSerie borrada");
				//fullSerie.remove({}, carregar);

				res.status(200).send();
			}
		);
	}


	var req2 = https.request(opt, callback).end();
}

exports.recull = function(req, res) {
	fullSerie.remove({}, function(err) {
		if(err){
			console.log(err);
		}else{
			console.log('collection removed');
		}

	});
	obtenirToken(req, res, getSerie);

	//return res.redirect('/#!/settings/profile');
}


