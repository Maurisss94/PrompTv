'use strict';

(function() {
	// Seriefulls Controller Spec
	describe('Seriefulls Controller Tests', function() {
		// Initialize global variables
		var SeriefullsController,
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

			// Initialize the Seriefulls controller.
			SeriefullsController = $controller('SeriefullsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Seriefull object fetched from XHR', inject(function(Seriefulls) {
			// Create sample Seriefull using the Seriefulls service
			var sampleSeriefull = new Seriefulls({
				name: 'New Seriefull'
			});

			// Create a sample Seriefulls array that includes the new Seriefull
			var sampleSeriefulls = [sampleSeriefull];

			// Set GET response
			$httpBackend.expectGET('seriefulls').respond(sampleSeriefulls);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.seriefulls).toEqualData(sampleSeriefulls);
		}));

		it('$scope.findOne() should create an array with one Seriefull object fetched from XHR using a seriefullId URL parameter', inject(function(Seriefulls) {
			// Define a sample Seriefull object
			var sampleSeriefull = new Seriefulls({
				name: 'New Seriefull'
			});

			// Set the URL parameter
			$stateParams.seriefullId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/seriefulls\/([0-9a-fA-F]{24})$/).respond(sampleSeriefull);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.seriefull).toEqualData(sampleSeriefull);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Seriefulls) {
			// Create a sample Seriefull object
			var sampleSeriefullPostData = new Seriefulls({
				name: 'New Seriefull'
			});

			// Create a sample Seriefull response
			var sampleSeriefullResponse = new Seriefulls({
				_id: '525cf20451979dea2c000001',
				name: 'New Seriefull'
			});

			// Fixture mock form input values
			scope.name = 'New Seriefull';

			// Set POST response
			$httpBackend.expectPOST('seriefulls', sampleSeriefullPostData).respond(sampleSeriefullResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Seriefull was created
			expect($location.path()).toBe('/seriefulls/' + sampleSeriefullResponse._id);
		}));

		it('$scope.update() should update a valid Seriefull', inject(function(Seriefulls) {
			// Define a sample Seriefull put data
			var sampleSeriefullPutData = new Seriefulls({
				_id: '525cf20451979dea2c000001',
				name: 'New Seriefull'
			});

			// Mock Seriefull in scope
			scope.seriefull = sampleSeriefullPutData;

			// Set PUT response
			$httpBackend.expectPUT(/seriefulls\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/seriefulls/' + sampleSeriefullPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid seriefullId and remove the Seriefull from the scope', inject(function(Seriefulls) {
			// Create new Seriefull object
			var sampleSeriefull = new Seriefulls({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Seriefulls array and include the Seriefull
			scope.seriefulls = [sampleSeriefull];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/seriefulls\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSeriefull);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.seriefulls.length).toBe(0);
		}));
	});
}());