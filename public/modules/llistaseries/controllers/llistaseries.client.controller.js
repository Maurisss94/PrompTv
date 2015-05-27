'use strict';

// Llistaseries controller
angular.module('llistaseries').controller('LlistaseriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Llistaseries',
	function($scope, $stateParams, $location, Authentication, Llistaseries) {
		$scope.authentication = Authentication;


		// Create new Llistaserie
		//$scope.create = function() {
		//	// Create new Llistaserie object
		//	var llistaserie = new Llistaseries ({
		//		name: this.name
		//	});
		//
		//	// Redirect after save
		//	llistaserie.$save(function(response) {
		//		$location.path('llistaseries/' + response._id);
		//
		//		// Clear form fields
		//		$scope.name = '';
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		//};

		// Remove existing Llistaserie
		//$scope.remove = function(llistaserie) {
		//	if ( llistaserie ) {
		//		llistaserie.$remove();
		//
		//		for (var i in $scope.llistaseries) {
		//			if ($scope.llistaseries [i] === llistaserie) {
		//				$scope.llistaseries.splice(i, 1);
		//			}
		//		}
		//	} else {
		//		$scope.llistaserie.$remove(function() {
		//			$location.path('llistaseries');
		//		});
		//	}
		//};

		// Update existing Llistaserie
		//$scope.update = function() {
		//	var llistaserie = $scope.llistaserie;
		//
		//	llistaserie.$update(function() {
		//		$location.path('llistaseries/' + llistaserie._id);
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		//};

		// Find a list of Llistaseries
		if ($scope.authentication.user === '') {
			$location.path('/#!/');
		} else {
			$scope.find = function () {
				$scope.llistaseries = Llistaseries.srv.query();
				console.log($scope.llistaseries._id);
			};

		}
	}


		// Find existing Llistaserie
	//	$scope.findOne = function() {
	//		$scope.llistaseries = Llistaseries.srv.get({
	//			llistaserieId: $stateParams.llistaserieId
	//		});
	//		console.log($stateParams.llistaserieId);
	//	};
	//}
]);