/**
 * Home controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.controller( 'HomeCtrl', HomeCtrl );

	HomeCtrl.$inject = [ '$log' ];

	/**
	 * Home controller
	 */
	function HomeCtrl( $log ) {

		var vm = this;

		/*
		----------------------------------------------------------------
		Initiate public scope variables
		----------------------------------------------------------------
		*/
		
		// controller bindables
		// vm.sth = null;

		// controller api
		// vm.sthFn = _sthFn;

		// initialize controller
		_init();

		/*
		----------------------------------------------------------------
		Private API
		----------------------------------------------------------------
		*/

		// sth
		/*
		function _sthFn() {			

		}
		*/

		// controller initialize
		function _init() {

			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'HomeCtrl' );

			// _sthFn();

		}

	}

})();