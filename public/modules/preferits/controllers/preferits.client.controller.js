'use strict';

// Preferits controller
angular.module('preferits').controller('PreferitsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Preferits',
	function($scope, $stateParams, $location, Authentication, Preferits) {
		$scope.authentication = Authentication;

		// Create new Preferit
		$scope.create = function() {
			// Create new Preferit object
			var preferit = new Preferits ({
				name: this.name
			});

			// Redirect after save
			preferit.$save(function(response) {
				$location.path('preferits/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Preferit
		$scope.remove = function(preferit) {
			if ( preferit ) { 
				preferit.$remove();

				for (var i in $scope.preferits) {
					if ($scope.preferits [i] === preferit) {
						$scope.preferits.splice(i, 1);
					}
				}
			} else {
				$scope.preferit.$remove(function() {
					$location.path('preferits');
				});
			}
		};

		// Update existing Preferit
		$scope.update = function() {
			var preferit = $scope.preferit;

			preferit.$update(function() {
				$location.path('preferits/' + preferit._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Preferits
		$scope.find = function() {
			$scope.preferits = Preferits.query();
		};

		// Find existing Preferit
		$scope.findOne = function() {
			$scope.preferit = Preferits.get({ 
				preferitId: $stateParams.preferitId
			});
		};
	}
]);
