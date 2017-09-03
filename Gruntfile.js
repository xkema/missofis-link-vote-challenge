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

		// task :: @see https://www.npmjs.com/package/grunt-contrib-concat
    ,concat: {
      styles: {
        src: [
          './bower_components/font-awesome/css/font-awesome.min.css',
          './bower_components/skeleton/css/normalize.css',
          './bower_components/skeleton/css/skeleton.css',
          './app/assets/styles/css/linkvotechallenge.main.css'
        ],
        dest: 'demo/main.css'
      },
      top: {
        src: [
          './bower_components/angular/angular.min.js',
          './bower_components/angular-route/angular-route.min.js',
          './bower_components/angular-animate/angular-animate.min.js'
        ],
        dest: 'demo/top.js'
      },
      bottom: {
        src: [
          './app/core/app.module.js',
          './app/core/app.config.js',
          './app/services/app.service.js',
          './app/common/_pagination/pagination.controller.js',
          './app/common/_pagination/pagination.component.js',
          './app/common/_modal/modal.controller.js',
          './app/common/_modal/modal.component.js',
          './app/common/_toaster/toaster.controller.js',
          './app/common/_toaster/toaster.component.js',
          './app/views/_home/home.controller.js',
          './app/views/_add/add.controller.js'
        ],
        dest: 'demo/bottom.js'
      }
    }
    // task :: @see https://www.npmjs.com/package/grunt-contrib-uglify
    ,uglify: {
      all: {
        options: {
          mangle: false
        },
        files: {
          './demo/top.js': './demo/top.js',
          './demo/bottom.js': './demo/bottom.js'
        }
      }
    }

	} );

	// load modules (dev)
	grunt.loadNpmTasks( 'grunt-browser-sync' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-karma' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	// load modules (build?)
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

	// register "default" development task for grunt
	grunt.registerTask( 'default', function() {
		grunt.task.run( 'karma:unit_bg', 'sass:dev', 'browserSync:dev', 'watch' );
	} );	

	// register "test" task for grunt
	grunt.registerTask( 'test', function() {
		grunt.task.run( 'karma:unit' );
	} );

}; // end :: module.exports