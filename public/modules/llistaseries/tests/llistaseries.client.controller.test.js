'use strict';

(function() {
	// Llistaseries Controller Spec
	describe('Llistaseries Controller Tests', function() {
		// Initialize global variables
		var LlistaseriesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Llistaseries controller.
			LlistaseriesController = $controller('LlistaseriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Llistaserie object fetched from XHR', inject(function(Llistaseries) {
			// Create sample Llistaserie using the Llistaseries service
			var sampleLlistaserie = new Llistaseries({
				name: 'New Llistaserie'
			});

			// Create a sample Llistaseries array that includes the new Llistaserie
			var sampleLlistaseries = [sampleLlistaserie];

			// Set GET response
			$httpBackend.expectGET('llistaseries').respond(sampleLlistaseries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.llistaseries).toEqualData(sampleLlistaseries);
		}));

		it('$scope.findOne() should create an array with one Llistaserie object fetched from XHR using a llistaserieId URL parameter', inject(function(Llistaseries) {
			// Define a sample Llistaserie object
			var sampleLlistaserie = new Llistaseries({
				name: 'New Llistaserie'
			});

			// Set the URL parameter
			$stateParams.llistaserieId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/llistaseries\/([0-9a-fA-F]{24})$/).respond(sampleLlistaserie);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.llistaserie).toEqualData(sampleLlistaserie);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Llistaseries) {
			// Create a sample Llistaserie object
			var sampleLlistaseriePostData = new Llistaseries({
				name: 'New Llistaserie'
			});

			// Create a sample Llistaserie response
			var sampleLlistaserieResponse = new Llistaseries({
				_id: '525cf20451979dea2c000001',
				name: 'New Llistaserie'
			});

			// Fixture mock form input values
			scope.name = 'New Llistaserie';

			// Set POST response
			$httpBackend.expectPOST('llistaseries', sampleLlistaseriePostData).respond(sampleLlistaserieResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Llistaserie was created
			expect($location.path()).toBe('/llistaseries/' + sampleLlistaserieResponse._id);
		}));

		it('$scope.update() should update a valid Llistaserie', inject(function(Llistaseries) {
			// Define a sample Llistaserie put data
			var sampleLlistaseriePutData = new Llistaseries({
				_id: '525cf20451979dea2c000001',
				name: 'New Llistaserie'
			});

			// Mock Llistaserie in scope
			scope.llistaserie = sampleLlistaseriePutData;

			// Set PUT response
			$httpBackend.expectPUT(/llistaseries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/llistaseries/' + sampleLlistaseriePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid llistaserieId and remove the Llistaserie from the scope', inject(function(Llistaseries) {
			// Create new Llistaserie object
			var sampleLlistaserie = new Llistaseries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Llistaseries array and include the Llistaserie
			scope.llistaseries = [sampleLlistaserie];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/llistaseries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLlistaserie);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.llistaseries.length).toBe(0);
		}));
	});
}());