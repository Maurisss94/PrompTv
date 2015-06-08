'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'promptv';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'ngAria', 'ngMaterial', 'angularFileUpload'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('llistaseries');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('preferits');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('seriefulls');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		console.log($scope.menu);

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.myInterval = 5000;

	}



]);

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
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Articles module
angular.module('llistaseries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Lista de series', 'llistaseries');
	}
]);
'use strict';

//Setting up route
angular.module('llistaseries').config(['$stateProvider',
	function($stateProvider) {
		// Llistaseries state routing
		$stateProvider.
		state('listLlistaseries', {
			url: '/llistaseries',
			templateUrl: 'modules/llistaseries/views/list-llistaseries.client.view.html'
		});
	}
]);

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
app.run(["paginationConfig", function(paginationConfig){
	paginationConfig.nextText='Siguiente';
	paginationConfig.previousText='Anterior';
}])

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
'use strict';

//Llistaseries service used to communicate Llistaseries REST endpoints
angular.module('llistaseries').factory('Llistaseries', ['$resource',
	function($resource) {
		return {srv: $resource("/llistaseries/:llistaserieId", null,
			{
				'update': { method:'PUT' }
			}),
			edit: null,
			prova: $resource('/llistaseries/paginate/:page/:total', {},
{
				})

		}


	}

]);


'use strict';

// Configuring the Articles module
angular.module('preferits').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tus Favoritos', 'preferits');

	}
]);

'use strict';

//Setting up route
angular.module('preferits').config(['$stateProvider',
	function($stateProvider) {
		// Preferits state routing
		$stateProvider.
		state('listPreferits', {
			url: '/preferits',
			templateUrl: 'modules/preferits/views/list-preferits.client.view.html'
		});
	}
]);

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

'use strict';

//Preferits service used to communicate Preferits REST endpoints
angular.module('preferits').factory('Preferits', ['$resource',
	function($resource) {
		return $resource('preferits/:preferitId', { preferitId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('seriefulls').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Seriefulls', 'seriefulls', 'dropdown', '/seriefulls(/create)?');
	}
]);
'use strict';

//Setting up route
angular.module('seriefulls').config(['$stateProvider',
	function($stateProvider) {
		// Seriefulls state routing
		$stateProvider.
		state('listSeriefulls', {
			url: '/seriefulls',
			templateUrl: 'modules/seriefulls/views/list-seriefulls.client.view.html'
		}).
		state('viewSeriefull', {
			url: '/seriefulls/:seriefullId',
			templateUrl: 'modules/seriefulls/views/view-seriefull.client.view.html'
		});
	}
]);

'use strict';

// Seriefulls controller
angular.module('seriefulls').controller('SeriefullsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Seriefulls', 'Preferits',
    function ($scope, $stateParams, $location, Authentication, Seriefulls, Preferits) {
        $scope.authentication = Authentication;


        // Find a list of Seriefulls
        if ($scope.authentication.user === '') {
            $location.path('/#!/');

        } else {
            $scope.find = function () {
                $scope.seriefulls = Seriefulls.query();

            };
            $scope.findOne = function () {
                $scope.seriefull = Seriefulls.get({
                    seriefullId: $stateParams.seriefullId
                });
                $scope.seriefull.$promise.then(function (data) {
                    $scope.create = function () {

                        var preferit = new Preferits({
                            idm: data.idm,
                            nom: data.nom,
                            imatge: data.imatge,
                            temporades: data.num_temporades,
                            seriefull: null

                        });

                        preferit.$save(function (response) {

                            swal({
                                title: "Enhorabuena!",
                                text: "Añadida a favoritos",
                                type: "success",
                                confirmButtonText: "Aceptar"
                            });

                        }, function (errorResponse) {

                            $scope.error = errorResponse.data.message;
                        });


                    };

                    $scope.numero = [];

                    for (var i = 1; i <= data.num_temporades; i++) {

                        $scope.numero.push({
                            num: i
                        });

                    }

                })


            };

        }

    }
]);



'use strict';

//Seriefulls service used to communicate Seriefulls REST endpoints
angular.module('seriefulls').factory('Seriefulls', ['$resource',
	function($resource) {
		return $resource('seriefulls/:seriefullId', { seriefullId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/llistaseries');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
 'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication', 'FileUploader',
	function($scope, $http, $location, Users, Authentication, FileUploader) {


		var uploader = $scope.uploader = new FileUploader({url:"/upload",alias:"image",removeAfterUpload: true});


		$scope.user = Authentication.user;
		console.log($scope.user);

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);