'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Preferit = mongoose.model('Preferit'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, preferit;

/**
 * Preferit routes tests
 */
describe('Preferit CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Preferit
		user.save(function() {
			preferit = {
				name: 'Preferit Name'
			};

			done();
		});
	});

	it('should be able to save Preferit instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Preferit
				agent.post('/preferits')
					.send(preferit)
					.expect(200)
					.end(function(preferitSaveErr, preferitSaveRes) {
						// Handle Preferit save error
						if (preferitSaveErr) done(preferitSaveErr);

						// Get a list of Preferits
						agent.get('/preferits')
							.end(function(preferitsGetErr, preferitsGetRes) {
								// Handle Preferit save error
								if (preferitsGetErr) done(preferitsGetErr);

								// Get Preferits list
								var preferits = preferitsGetRes.body;

								// Set assertions
								(preferits[0].user._id).should.equal(userId);
								(preferits[0].name).should.match('Preferit Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Preferit instance if not logged in', function(done) {
		agent.post('/preferits')
			.send(preferit)
			.expect(401)
			.end(function(preferitSaveErr, preferitSaveRes) {
				// Call the assertion callback
				done(preferitSaveErr);
			});
	});

	it('should not be able to save Preferit instance if no name is provided', function(done) {
		// Invalidate name field
		preferit.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Preferit
				agent.post('/preferits')
					.send(preferit)
					.expect(400)
					.end(function(preferitSaveErr, preferitSaveRes) {
						// Set message assertion
						(preferitSaveRes.body.message).should.match('Please fill Preferit name');
						
						// Handle Preferit save error
						done(preferitSaveErr);
					});
			});
	});

	it('should be able to update Preferit instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Preferit
				agent.post('/preferits')
					.send(preferit)
					.expect(200)
					.end(function(preferitSaveErr, preferitSaveRes) {
						// Handle Preferit save error
						if (preferitSaveErr) done(preferitSaveErr);

						// Update Preferit name
						preferit.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Preferit
						agent.put('/preferits/' + preferitSaveRes.body._id)
							.send(preferit)
							.expect(200)
							.end(function(preferitUpdateErr, preferitUpdateRes) {
								// Handle Preferit update error
								if (preferitUpdateErr) done(preferitUpdateErr);

								// Set assertions
								(preferitUpdateRes.body._id).should.equal(preferitSaveRes.body._id);
								(preferitUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Preferits if not signed in', function(done) {
		// Create new Preferit model instance
		var preferitObj = new Preferit(preferit);

		// Save the Preferit
		preferitObj.save(function() {
			// Request Preferits
			request(app).get('/preferits')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Preferit if not signed in', function(done) {
		// Create new Preferit model instance
		var preferitObj = new Preferit(preferit);

		// Save the Preferit
		preferitObj.save(function() {
			request(app).get('/preferits/' + preferitObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', preferit.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Preferit instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Preferit
				agent.post('/preferits')
					.send(preferit)
					.expect(200)
					.end(function(preferitSaveErr, preferitSaveRes) {
						// Handle Preferit save error
						if (preferitSaveErr) done(preferitSaveErr);

						// Delete existing Preferit
						agent.delete('/preferits/' + preferitSaveRes.body._id)
							.send(preferit)
							.expect(200)
							.end(function(preferitDeleteErr, preferitDeleteRes) {
								// Handle Preferit error error
								if (preferitDeleteErr) done(preferitDeleteErr);

								// Set assertions
								(preferitDeleteRes.body._id).should.equal(preferitSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Preferit instance if not signed in', function(done) {
		// Set Preferit user 
		preferit.user = user;

		// Create new Preferit model instance
		var preferitObj = new Preferit(preferit);

		// Save the Preferit
		preferitObj.save(function() {
			// Try deleting Preferit
			request(app).delete('/preferits/' + preferitObj._id)
			.expect(401)
			.end(function(preferitDeleteErr, preferitDeleteRes) {
				// Set message assertion
				(preferitDeleteRes.body.message).should.match('User is not logged in');

				// Handle Preferit error error
				done(preferitDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Preferit.remove().exec();
		done();
	});
});