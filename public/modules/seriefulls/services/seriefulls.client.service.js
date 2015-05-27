'use strict';

//Seriefulls service used to communicate Seriefulls REST endpoints
angular.module('seriefulls').factory('Seriefulls', ['$resource',
	function($resource) {
		return $resource('seriefulls/:seriefullId', { seriefullId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);