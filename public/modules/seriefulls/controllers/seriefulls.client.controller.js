'use strict';

// Seriefulls controller
angular.module('seriefulls').controller('SeriefullsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Seriefulls',
	function($scope, $stateParams, $location, Authentication, Seriefulls) {
		$scope.authentication = Authentication;

		// Create new Seriefull
		//$scope.create = function() {
		//	// Create new Seriefull object
		//	var seriefull = new Seriefulls ({
		//		name: this.name
		//	});
        //
		//	// Redirect after save
		//	seriefull.$save(function(response) {
		//		$location.path('seriefulls/' + response._id);
        //
		//		// Clear form fields
		//		$scope.name = '';
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		//};
        //
		//// Remove existing Seriefull
		//$scope.remove = function(seriefull) {
		//	if ( seriefull ) {
		//		seriefull.$remove();
        //
		//		for (var i in $scope.seriefulls) {
		//			if ($scope.seriefulls [i] === seriefull) {
		//				$scope.seriefulls.splice(i, 1);
		//			}
		//		}
		//	} else {
		//		$scope.seriefull.$remove(function() {
		//			$location.path('seriefulls');
		//		});
		//	}
		//};
        //
		//// Update existing Seriefull
		//$scope.update = function() {
		//	var seriefull = $scope.seriefull;
        //
		//	seriefull.$update(function() {
		//		$location.path('seriefulls/' + seriefull._id);
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		//};

		// Find a list of Seriefulls
		if($scope.authentication.user === ''){
			$location.path('/#!/');

		}else{
			$scope.find = function() {
				$scope.seriefulls = Seriefulls.query();
			};
			$scope.findOne = function() {
				$scope.seriefull = Seriefulls.get({
					seriefullId: $stateParams.seriefullId
				});
			};

		}


		// Find existing Seriefull

	}
]);