'use strict';

// Configuring the Articles module
angular.module('preferits').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tus Favoritos', 'preferits');

	}
]);
