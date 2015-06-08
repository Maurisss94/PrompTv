'use strict';

angular.module('core').directive('slider', [
	function() {
		return {
			templateUrl: 'modules/core/views/slider.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Slider directive logic
				// ...
				console.log(element[0]);
				$('.autoplay').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 4000,

						dots: true,
						infinite: true,
						speed: 500,
						fade: true,
						cssEase: 'linear'

				});
			}
		};
	}
]);