/**
 * Add controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.controller( 'AddCtrl', AddCtrl );

	AddCtrl.$inject = [ '$log' ];

	/**
	 * Add controller
	 */
	function AddCtrl( $log ) {

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

			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'AddCtrl' );

			// _sthFn();

		}

	}

})();