'use strict';

// Llistaseries controller
var app = angular.module('llistaseries').controller('LlistaseriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Llistaseries', '$log',
	function($scope, $stateParams, $location, Authentication, Llistaseries,  $log) {

		$scope.authentication = Authentication;

		$scope.totalItems =120;
		$scope.currentPage = 1;


		/**
		 * Objecte declarat per poder crear el buscador.
		 */
		var self = this;
		self.simulateQuery = false;
		self.isDisabled    = false;
		self.states        = null;
		self.querySearch   = querySearch;
		self.selectedItemChange = selectedItemChange;
		self.searchTextChange   = searchTextChange;
		loadAll();


		/**
		 * Funció que va buscant entre totes les series mentre
		 * l'usuari escriu el nom de la serie.
		 * @param query
		 * @returns {*}
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
		function selectedItemChange(item,i) {

			$location.path(item.link);
			$log.info('Item changed to ' + JSON.stringify(item));
		}
		/**
		 * Funció que crea un objecte amb el nom de la serie i el link cap a ella.
		 */
		function loadAll() {
			var serie = Llistaseries.srv.query();
			var text = "";
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


		if ($scope.authentication.user === '') {
			$location.path('/#!/');
		} else {
			$scope.find = function () {
				/**
				 * Es mostren 4 series per pagina.
				 */
				$scope.llistaseries = Llistaseries.prova.query({'total':4,'page': $scope.currentPage});
				$scope.pageChanged = function() {
					$scope.llistaseries = Llistaseries.prova.query({'total':4,'page': $scope.currentPage});

				};
			};


		}
	}


]);
/**
 * Traducció de la paginació.
 */
app.run(function(paginationConfig){
	paginationConfig.nextText='Siguiente';
	paginationConfig.previousText='Anterior';
})
