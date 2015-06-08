'use strict';

(function() {
	// Preferits Controller Spec
	describe('Preferits Controller Tests', function() {
		// Initialize global variables
		var PreferitsController,
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

			// Initialize the Preferits controller.
			PreferitsController = $controller('PreferitsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Preferit object fetched from XHR', inject(function(Preferits) {
			// Create sample Preferit using the Preferits service
			var samplePreferit = new Preferits({
				name: 'New Preferit'
			});

			// Create a sample Preferits array that includes the new Preferit
			var samplePreferits = [samplePreferit];

			// Set GET response
			$httpBackend.expectGET('preferits').respond(samplePreferits);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.preferits).toEqualData(samplePreferits);
		}));

		it('$scope.findOne() should create an array with one Preferit object fetched from XHR using a preferitId URL parameter', inject(function(Preferits) {
			// Define a sample Preferit object
			var samplePreferit = new Preferits({
				name: 'New Preferit'
			});

			// Set the URL parameter
			$stateParams.preferitId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/preferits\/([0-9a-fA-F]{24})$/).respond(samplePreferit);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.preferit).toEqualData(samplePreferit);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Preferits) {
			// Create a sample Preferit object
			var samplePreferitPostData = new Preferits({
				name: 'New Preferit'
			});

			// Create a sample Preferit response
			var samplePreferitResponse = new Preferits({
				_id: '525cf20451979dea2c000001',
				name: 'New Preferit'
			});

			// Fixture mock form input values
			scope.name = 'New Preferit';

			// Set POST response
			$httpBackend.expectPOST('preferits', samplePreferitPostData).respond(samplePreferitResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Preferit was created
			expect($location.path()).toBe('/preferits/' + samplePreferitResponse._id);
		}));

		it('$scope.update() should update a valid Preferit', inject(function(Preferits) {
			// Define a sample Preferit put data
			var samplePreferitPutData = new Preferits({
				_id: '525cf20451979dea2c000001',
				name: 'New Preferit'
			});

			// Mock Preferit in scope
			scope.preferit = samplePreferitPutData;

			// Set PUT response
			$httpBackend.expectPUT(/preferits\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/preferits/' + samplePreferitPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid preferitId and remove the Preferit from the scope', inject(function(Preferits) {
			// Create new Preferit object
			var samplePreferit = new Preferits({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Preferits array and include the Preferit
			scope.preferits = [samplePreferit];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/preferits\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePreferit);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.preferits.length).toBe(0);
		}));
	});
}());