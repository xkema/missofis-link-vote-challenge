// almighty grunt wrapper (link vote challenge)
module.exports = function( grunt ) {
	
	// project config.
	grunt.initConfig( {

		// read package file
		pkg: grunt.file.readJSON( 'package.json' )

		/*
		----------------------------------------------------------------
		DEVEVELOPMENT
		----------------------------------------------------------------
		*/

		// task :: @see https://github.com/gruntjs/grunt-contrib-watch#watch-task
		,watch: {			
			configFiles: {
				files: [ 'Gruntfile.js', 'karma.conf.js' ],
				options: {
					reload: true
				}
			},
			sass: {
				files: 'app/assets/styles/scss/*.scss',
				tasks: [ 'sass' ]
			},
		}
		// task :: @see https://www.npmjs.com/package/grunt-contrib-sass
		,sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'app/assets/styles/css/linkvotechallenge.main.css': 'app/assets/styles/scss/linkvotechallenge.main.scss'
				}
			}
		}
		// task :: @see http://www.browsersync.io/docs/grunt/
		,browserSync: {
			dev: {
				bsFiles: {
					src: [
						'app/index.html',
						'app/views/_*/*.(controller|directive)?(.spec).js',
						'app/common/_*/*.(controller|directive|component)?(.spec).js',
						'app/views/_*/view-*.html',
						'app/common/_*/template-*.html',
						'app/services/*.js',
						'app/core/*.js',
						'app/assets/styles/css/linkvotechallenge.main.css'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: [ 'app/' ],
						directory: false,
						routes: {
							'/bower_components': 'bower_components',
							'/test': 'test'
						}
					},
					open: !true,
					browser: [ 'chrome' ], // strangely opens in chrome canary :)
				}
			}

		}
		// task :: @see https://www.npmjs.com/package/grunt-karma
		,karma: {
			unit: {
				configFile: 'karma.conf.js'
			},
			unit_bg: {
				configFile: 'karma.conf.js',
				background: true
			}
		}

		/*
		----------------------------------------------------------------
		BUILD
		----------------------------------------------------------------
		*/

		// no build tasks defined

	} );

	// load modules (dev)
	grunt.loadNpmTasks( 'grunt-browser-sync' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-karma' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	// load modules (build?)

	// register "default" development task for grunt
	grunt.registerTask( 'default', function() {
		grunt.task.run( 'karma:unit_bg', 'sass:dev', 'browserSync:dev', 'watch' );
	} );	

	// register "test" task for grunt
	grunt.registerTask( 'test', function() {
		grunt.task.run( 'karma:unit' );
	} );

}; // end :: module.exports