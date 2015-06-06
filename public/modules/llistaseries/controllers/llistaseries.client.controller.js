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
		self.states        = null;
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
		loadAll();
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
		function selectedItemChange(item,i) {

			$location.path(item.link);
			$log.info('Item changed to ' + JSON.stringify(item));
		}
		/**
		 * Build `states` list of key/value pairs
		 */
		function loadAll() {
			console.log(Authentication.user);
			var serie = Llistaseries.srv.query();
			var text = "";
			var prova = [];
			console.log(serie);
			serie.$promise.then(function(data){
				serie= data;

				for(var i=0;i<serie.length;i++){
					text += serie[i].nom+ '|' + data[i].seriefull+', '
				}

				self.states = text.split(/, +/g).map(function (state,i) {
					return {
						value: state.split('|')[0].toLowerCase(),
						display: state.split('|')[0],
						link: '/seriefulls/'+ state.split('|')[1]
					};

					});

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
