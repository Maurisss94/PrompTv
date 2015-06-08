'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://mauro:maurobale94@ds043942.mongolab.com:43942/promptv',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				"public/lib/slick/slick.css",
				"public/lib/slick/slick-theme.css",
				"public/lib/slick/slick-theme.css" ,
				"public/lib/animateCss/animate.css" ,
				"public/lib/animateCss/page-trans.css" ,
				"public/lib/angular-material/angular-material.min.css",
				"public/lib/sweetalert/dist/sweetalert.css"
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				"public/lib/angular-aria/angular-aria.min.js",
				"public/lib/angular-material/angular-material.min.js",
				"public/lib/jquery/dist/jquery.min.js",
				"public/lib/slick/slick.min.js",
				"public/lib/angular-file-upload/angular-file-upload.min.js",
				"public/lib/sweetalert/dist/sweetalert.min.js"
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
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
