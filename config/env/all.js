'use strict';

module.exports = {
	app: {
		title: 'PrompTv',
		description: 'Aplicacio web per gestionar la programacio de series, pelicules etc...',
		keywords: 'Series, programacion, gestion'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
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
				"public/lib/sweetalert/dist/sweetalert.min.js",
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};