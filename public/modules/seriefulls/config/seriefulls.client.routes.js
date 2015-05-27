'use strict';

//Setting up route
angular.module('seriefulls').config(['$stateProvider',
	function($stateProvider) {
		// Seriefulls state routing
		$stateProvider.
		state('listSeriefulls', {
			url: '/seriefulls',
			templateUrl: 'modules/seriefulls/views/list-seriefulls.client.view.html'
		}).
		state('viewSeriefull', {
			url: '/seriefulls/:seriefullId',
			templateUrl: 'modules/seriefulls/views/view-seriefull.client.view.html'
		});
	}
]);