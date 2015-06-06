'use strict';

// Seriefulls controller
angular.module('seriefulls').controller('SeriefullsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Seriefulls', 'Preferits',
	function($scope, $stateParams, $location, Authentication, Seriefulls, Preferits) {
		$scope.authentication = Authentication;


		$scope.alerts = [

		];

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

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
				$scope.seriefull.$promise.then(function (data) {
					$scope.create = function() {

						var preferit = new Preferits({
							idm: data.idm,
							nom: data.nom,
							imatge: data.imatge,
							temporades: data.num_temporades,
							seriefull: null

						});

							preferit.$save(function(response) {

								swal({   title: "Enhorabuena!",   text: "Añadida a favoritos",   type: "success",   confirmButtonText: "Aceptar" });

							}, function(errorResponse) {

								$scope.error = errorResponse.data.message;
							});



					};

					$scope.numero =[];

					for(var i=1;i<=data.num_temporades;i++){

							$scope.numero.push({
								num: i
							});

					}
					//console.log($scope.numero);
				})



			};

		}


		// Find existing Seriefull

	}
]);


