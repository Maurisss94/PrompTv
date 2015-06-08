'use strict';

//Setting up route
angular.module('preferits').config(['$stateProvider',
	function($stateProvider) {
		// Preferits state routing
		$stateProvider.
		state('listPreferits', {
			url: '/preferits',
			templateUrl: 'modules/preferits/views/list-preferits.client.view.html'
		});
	}
]);
