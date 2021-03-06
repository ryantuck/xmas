// Gruntfile.js

module.exports = function(grunt) {

	var jsFiles = [
		'public/libs/jquery/dist/jquery.js',
		'public/libs/jquery-ui/jquery-ui.js',
		'public/libs/angular/angular.min.js',
		'public/libs/angular-route/angular-route.min.js',
		'public/libs/bootstrap/dist/js/bootstrap.js',
		'node_modules/angular-ui-sortable/src/sortable.js',
		'public/js/**/*.js',
		'public/js/*.js'
		];


	grunt.initConfig({

		// JS =======================================

		// check all js files for errors
		jshint: {
			all: ['public/js/**/*.js','public/js/*.js'],
			options: {
				smarttabs: true
			}
		},

		// take all js files and minify them into app.min.js
		uglify: {
			options: {
				mangle: false 	// *** this is necessary for allowing angular files to compile!
			},
			build: {
				files: {
					'public/dist/js/app.min.js': jsFiles
				}
			}
		},

		// CSS ======================================

		// process less file to style.css
		less: {
			build: {
				files: {
					'public/dist/css/style.css' : 'public/css/style.less'
				}
			}
		},

		cssmin: {
			build: {
				files: {
					'public/dist/css/style.min.css' : 'public/dist/css/style.css'
				}
			}
		},

		// COOL STUFF ===============================

		// watch css and js files and then process stuff above
		watch: {
			css: {
				files: ['public/css/**/*.less'],
				tasks: ['less','cssmin']
			},
			js: {
				files: jsFiles,
				tasks: ['uglify']
			}
		},

		// configure nodemon
		nodemon: {
			dev:{
				script: 'server.js'
			}
		},

		// run watch and nodemon at the same time
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['watch','nodemon']
		}

	});


	// load nodemon
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');


	// register the nodemon task upon running grunt
	grunt.registerTask('default',['less','cssmin','uglify','jshint','concurrent']);
	grunt.registerTask('heroku:production', 'uglify');

};













