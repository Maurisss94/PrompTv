'use strict';

//Preferits service used to communicate Preferits REST endpoints
angular.module('preferits').factory('Preferits', ['$resource',
	function($resource) {
		return $resource('preferits/:preferitId', { preferitId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);