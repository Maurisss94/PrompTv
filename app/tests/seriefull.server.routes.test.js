'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Seriefull = mongoose.model('Seriefull'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, seriefull;

/**
 * Seriefull routes tests
 */
describe('Seriefull CRUD tests', function() {
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

		// Save a user to the test db and create new Seriefull
		user.save(function() {
			seriefull = {
				name: 'Seriefull Name'
			};

			done();
		});
	});

	it('should be able to save Seriefull instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Seriefull
				agent.post('/seriefulls')
					.send(seriefull)
					.expect(200)
					.end(function(seriefullSaveErr, seriefullSaveRes) {
						// Handle Seriefull save error
						if (seriefullSaveErr) done(seriefullSaveErr);

						// Get a list of Seriefulls
						agent.get('/seriefulls')
							.end(function(seriefullsGetErr, seriefullsGetRes) {
								// Handle Seriefull save error
								if (seriefullsGetErr) done(seriefullsGetErr);

								// Get Seriefulls list
								var seriefulls = seriefullsGetRes.body;

								// Set assertions
								(seriefulls[0].user._id).should.equal(userId);
								(seriefulls[0].name).should.match('Seriefull Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Seriefull instance if not logged in', function(done) {
		agent.post('/seriefulls')
			.send(seriefull)
			.expect(401)
			.end(function(seriefullSaveErr, seriefullSaveRes) {
				// Call the assertion callback
				done(seriefullSaveErr);
			});
	});

	it('should not be able to save Seriefull instance if no name is provided', function(done) {
		// Invalidate name field
		seriefull.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Seriefull
				agent.post('/seriefulls')
					.send(seriefull)
					.expect(400)
					.end(function(seriefullSaveErr, seriefullSaveRes) {
						// Set message assertion
						(seriefullSaveRes.body.message).should.match('Please fill Seriefull name');
						
						// Handle Seriefull save error
						done(seriefullSaveErr);
					});
			});
	});

	it('should be able to update Seriefull instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Seriefull
				agent.post('/seriefulls')
					.send(seriefull)
					.expect(200)
					.end(function(seriefullSaveErr, seriefullSaveRes) {
						// Handle Seriefull save error
						if (seriefullSaveErr) done(seriefullSaveErr);

						// Update Seriefull name
						seriefull.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Seriefull
						agent.put('/seriefulls/' + seriefullSaveRes.body._id)
							.send(seriefull)
							.expect(200)
							.end(function(seriefullUpdateErr, seriefullUpdateRes) {
								// Handle Seriefull update error
								if (seriefullUpdateErr) done(seriefullUpdateErr);

								// Set assertions
								(seriefullUpdateRes.body._id).should.equal(seriefullSaveRes.body._id);
								(seriefullUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Seriefulls if not signed in', function(done) {
		// Create new Seriefull model instance
		var seriefullObj = new Seriefull(seriefull);

		// Save the Seriefull
		seriefullObj.save(function() {
			// Request Seriefulls
			request(app).get('/seriefulls')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Seriefull if not signed in', function(done) {
		// Create new Seriefull model instance
		var seriefullObj = new Seriefull(seriefull);

		// Save the Seriefull
		seriefullObj.save(function() {
			request(app).get('/seriefulls/' + seriefullObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', seriefull.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Seriefull instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Seriefull
				agent.post('/seriefulls')
					.send(seriefull)
					.expect(200)
					.end(function(seriefullSaveErr, seriefullSaveRes) {
						// Handle Seriefull save error
						if (seriefullSaveErr) done(seriefullSaveErr);

						// Delete existing Seriefull
						agent.delete('/seriefulls/' + seriefullSaveRes.body._id)
							.send(seriefull)
							.expect(200)
							.end(function(seriefullDeleteErr, seriefullDeleteRes) {
								// Handle Seriefull error error
								if (seriefullDeleteErr) done(seriefullDeleteErr);

								// Set assertions
								(seriefullDeleteRes.body._id).should.equal(seriefullSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Seriefull instance if not signed in', function(done) {
		// Set Seriefull user 
		seriefull.user = user;

		// Create new Seriefull model instance
		var seriefullObj = new Seriefull(seriefull);

		// Save the Seriefull
		seriefullObj.save(function() {
			// Try deleting Seriefull
			request(app).delete('/seriefulls/' + seriefullObj._id)
			.expect(401)
			.end(function(seriefullDeleteErr, seriefullDeleteRes) {
				// Set message assertion
				(seriefullDeleteRes.body.message).should.match('User is not logged in');

				// Handle Seriefull error error
				done(seriefullDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Seriefull.remove().exec();
		done();
	});
});