// Karma configuration
// Generated on Fri Sep 05 2014 11:23:48 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
		'http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js',
		'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.js',
		'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-route.js',
		'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-mocks.js',
		'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',	
		'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min.js',
		'js/controllers.js',
		'js/angularytics.js',
		'js/videos/*.js',
		'js/global/*.js',
		'js/app.js',
		'js/services.js',
		'js/flatui/controllers.js',
		'js/flatui/directives.js',
		'tests/controller.unittest.js',
		'tests/startapp.services.unittest.js',
		'tests/startapp.userservice.unittest.js',
		'tests/startapp.modalservice.unittest.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
