'use strict';

angular.module('llistaseries').directive('autocomplete', [
	function() {
		return {
			template: 'modules/llistaseries/views/md-autocomplete-text.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);