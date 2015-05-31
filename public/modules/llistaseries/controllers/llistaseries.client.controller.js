'use strict';

// Llistaseries controller
var app = angular.module('llistaseries').controller('LlistaseriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Llistaseries', '$log',
	function($scope, $stateParams, $location, Authentication, Llistaseries,  $log) {

		$scope.authentication = Authentication;

		$scope.totalItems =120;
		$scope.currentPage = 1;


		var self = this;
		self.simulateQuery = false;
		self.isDisabled    = false;
		// list of `state` value/display objects
		self.states        = loadAll();
		self.querySearch   = querySearch;
		self.selectedItemChange = selectedItemChange;
		self.searchTextChange   = searchTextChange;
		// ******************************
		// Internal methods
		// ******************************
		/**
		 * Search for states... use $timeout to simulate
		 * remote dataservice call.
		 */
		function querySearch (query) {
			var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
				deferred;
			if (self.simulateQuery) {
				deferred = $q.defer();
				$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
				return deferred.promise;
			} else {
				return results;
			}
		}
		function searchTextChange(text) {
			$log.info('Text changed to ' + text);
		}
		function selectedItemChange(item) {
			$log.info('Item changed to ' + JSON.stringify(item));
		}
		/**
		 * Build `states` list of key/value pairs
		 */
		function loadAll() {
			$scope.definitiu= '';
			var serie = Llistaseries.srv.query();
			var text = "";
			var aa = serie.$promise.then(function(data){
				serie= data;
				//console.log(serie);
				for(var i=0;i<serie.length;i++){
					text += serie[i].nom+ ', '

				}
				return text;
			});
			aa.then(function(data){
				console.log(data);
			});


			return 'hola'.split(/, +/g).map( function (state) {
				return {
					value: state.toLowerCase(),
					display: state
				};
			});
		}
		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(state) {
				return (state.value.indexOf(lowercaseQuery) === 0);
			};
		}




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
				//$scope.llistaseries = Llistaseries.srv.query();
				$scope.llistaseries = Llistaseries.prova.query({'total':4,'page': $scope.currentPage});
				$scope.pageChanged = function() {
					$scope.llistaseries = Llistaseries.prova.query({'total':4,'page': $scope.currentPage});

				};
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
app.run(function(paginationConfig){
	paginationConfig.nextText='Siguiente';
	paginationConfig.previousText='Anterior';
})