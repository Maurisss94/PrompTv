'use strict';

module.exports = {
	db: 'mongodb://localhost/promptv-dev',
	app: {
		title: 'PrompTV - Tus series favoritas'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '795280600579792',
		clientSecret: process.env.FACEBOOK_SECRET || '5b005251ca228bdcffa585794344554d',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'GR7YqO8MvwaAE7cFKulfoum4H',
		clientSecret: process.env.TWITTER_SECRET || 'l6szDQaFaGjLGAACtnqPNZ9Hpp2bYguyKJKdOuDEvLAP1WICDs',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '272618762952-vrrjhsqih34kcp5aivk81s782rg5gugc.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || '2_5v9HkNNpwQ3grHaE_MNfdI',
		callbackURL: '/oauth2callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
