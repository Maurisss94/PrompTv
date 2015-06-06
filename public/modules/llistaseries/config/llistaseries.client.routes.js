'use strict';

//Setting up route
angular.module('llistaseries').config(['$stateProvider',
	function($stateProvider) {
		// Llistaseries state routing
		$stateProvider.
		state('listLlistaseries', {
			url: '/llistaseries',
			templateUrl: 'modules/llistaseries/views/list-llistaseries.client.view.html'
		});
	}
]);
