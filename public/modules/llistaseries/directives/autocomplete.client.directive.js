'use strict';

angular.module('llistaseries').directive('autocomplete', [
	function() {
		return {
			template: 'modules/llistaseries/views/md-highlight-text.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);