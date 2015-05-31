'use strict';

//Llistaseries service used to communicate Llistaseries REST endpoints
angular.module('llistaseries').factory('Llistaseries', ['$resource',
	function($resource) {
		return {srv: $resource("/llistaseries/:llistaserieId", null,
			{
				'update': { method:'PUT' }
			}),
			edit: null,
			prova: $resource('/llistaseries/paginate/:page/:total', {},
{
				})

		}


	}

]);

