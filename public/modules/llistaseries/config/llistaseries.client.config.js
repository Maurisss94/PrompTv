'use strict';

// Configuring the Articles module
angular.module('llistaseries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Lista de series', 'llistaseries');
	}
]);