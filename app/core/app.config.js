/**
 * hepsiburada link vote challenge main module configuration
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.config( configApp )
		.run( runApp );

	configApp.$inject = [ '$locationProvider', '$routeProvider' ];
	runApp.$inject = [ 'LinkVoteChallengeService' ];

	/**
	 * app config block
	 */
	function configApp( $locationProvider, $routeProvider ) {

		$locationProvider.hashPrefix( '!' );

		$routeProvider

			.when( '/', {
				templateUrl: 'views/_home/view-home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			} )
			.when( '/add', {
				templateUrl: 'views/_add/view-add.html',
				controller: 'AddCtrl',
				controllerAs: 'vm'
			} )
			.otherwise( {
				templateUrl: 'views/_error/view-error.html',
				redirectTo: '/404'
			} );

	}

	/**
	 * app run block
	 */
	function runApp( LinkVoteChallengeService ) {

		LinkVoteChallengeService.initAppData();

	}

})();