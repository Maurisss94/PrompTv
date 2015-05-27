'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Llistaserie = mongoose.model('Llistaserie'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, llistaserie;

/**
 * Llistaserie routes tests
 */
describe('Llistaserie CRUD tests', function() {
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

		// Save a user to the test db and create new Llistaserie
		user.save(function() {
			llistaserie = {
				name: 'Llistaserie Name'
			};

			done();
		});
	});

	it('should be able to save Llistaserie instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Llistaserie
				agent.post('/llistaseries')
					.send(llistaserie)
					.expect(200)
					.end(function(llistaserieSaveErr, llistaserieSaveRes) {
						// Handle Llistaserie save error
						if (llistaserieSaveErr) done(llistaserieSaveErr);

						// Get a list of Llistaseries
						agent.get('/llistaseries')
							.end(function(llistaseriesGetErr, llistaseriesGetRes) {
								// Handle Llistaserie save error
								if (llistaseriesGetErr) done(llistaseriesGetErr);

								// Get Llistaseries list
								var llistaseries = llistaseriesGetRes.body;

								// Set assertions
								(llistaseries[0].user._id).should.equal(userId);
								(llistaseries[0].name).should.match('Llistaserie Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Llistaserie instance if not logged in', function(done) {
		agent.post('/llistaseries')
			.send(llistaserie)
			.expect(401)
			.end(function(llistaserieSaveErr, llistaserieSaveRes) {
				// Call the assertion callback
				done(llistaserieSaveErr);
			});
	});

	it('should not be able to save Llistaserie instance if no name is provided', function(done) {
		// Invalidate name field
		llistaserie.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Llistaserie
				agent.post('/llistaseries')
					.send(llistaserie)
					.expect(400)
					.end(function(llistaserieSaveErr, llistaserieSaveRes) {
						// Set message assertion
						(llistaserieSaveRes.body.message).should.match('Please fill Llistaserie name');
						
						// Handle Llistaserie save error
						done(llistaserieSaveErr);
					});
			});
	});

	it('should be able to update Llistaserie instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Llistaserie
				agent.post('/llistaseries')
					.send(llistaserie)
					.expect(200)
					.end(function(llistaserieSaveErr, llistaserieSaveRes) {
						// Handle Llistaserie save error
						if (llistaserieSaveErr) done(llistaserieSaveErr);

						// Update Llistaserie name
						llistaserie.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Llistaserie
						agent.put('/llistaseries/' + llistaserieSaveRes.body._id)
							.send(llistaserie)
							.expect(200)
							.end(function(llistaserieUpdateErr, llistaserieUpdateRes) {
								// Handle Llistaserie update error
								if (llistaserieUpdateErr) done(llistaserieUpdateErr);

								// Set assertions
								(llistaserieUpdateRes.body._id).should.equal(llistaserieSaveRes.body._id);
								(llistaserieUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Llistaseries if not signed in', function(done) {
		// Create new Llistaserie model instance
		var llistaserieObj = new Llistaserie(llistaserie);

		// Save the Llistaserie
		llistaserieObj.save(function() {
			// Request Llistaseries
			request(app).get('/llistaseries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Llistaserie if not signed in', function(done) {
		// Create new Llistaserie model instance
		var llistaserieObj = new Llistaserie(llistaserie);

		// Save the Llistaserie
		llistaserieObj.save(function() {
			request(app).get('/llistaseries/' + llistaserieObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', llistaserie.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Llistaserie instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Llistaserie
				agent.post('/llistaseries')
					.send(llistaserie)
					.expect(200)
					.end(function(llistaserieSaveErr, llistaserieSaveRes) {
						// Handle Llistaserie save error
						if (llistaserieSaveErr) done(llistaserieSaveErr);

						// Delete existing Llistaserie
						agent.delete('/llistaseries/' + llistaserieSaveRes.body._id)
							.send(llistaserie)
							.expect(200)
							.end(function(llistaserieDeleteErr, llistaserieDeleteRes) {
								// Handle Llistaserie error error
								if (llistaserieDeleteErr) done(llistaserieDeleteErr);

								// Set assertions
								(llistaserieDeleteRes.body._id).should.equal(llistaserieSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Llistaserie instance if not signed in', function(done) {
		// Set Llistaserie user 
		llistaserie.user = user;

		// Create new Llistaserie model instance
		var llistaserieObj = new Llistaserie(llistaserie);

		// Save the Llistaserie
		llistaserieObj.save(function() {
			// Try deleting Llistaserie
			request(app).delete('/llistaseries/' + llistaserieObj._id)
			.expect(401)
			.end(function(llistaserieDeleteErr, llistaserieDeleteRes) {
				// Set message assertion
				(llistaserieDeleteRes.body.message).should.match('User is not logged in');

				// Handle Llistaserie error error
				done(llistaserieDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Llistaserie.remove().exec();
		done();
	});
});