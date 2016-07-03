/**
 * HbLinkVoteToasterCtrl Controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.controller( 'HbLinkVoteToasterCtrl', HbLinkVoteToasterCtrl );

	HbLinkVoteToasterCtrl.$inject = [ '$log', '$scope', '$rootScope', '$timeout' ];

	/**
	 * HbLinkVoteToasterCtrl controller
	 */
	function HbLinkVoteToasterCtrl( $log, $scope, $rootScope, $timeout ) {

		var vm = this;

		/*
		----------------------------------------------------------------
		Initiate public scope variables
		----------------------------------------------------------------
		*/

		// controller bindables
		vm.toasterOpen = false;
		vm.toasterMessage = null;
		vm.toasterItem = null;
		
		// controller api

		// initialize controller
		_init();

		/*
		----------------------------------------------------------------
		Private API
		----------------------------------------------------------------
		*/
		
		/**
		 * Controller initialize
		 */
		function _init() {
			
			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'HbLinkVoteToasterCtrl' );

			// listen to modal events
			$rootScope.$on( 'hb.showToaster', function( event, data ) {

				if( 'hb.itemAdded' === data.toasterType ) {
					vm.toasterMessage = data.targetItem.item.name + ' item added!';
				}

				else if( 'hb.itemRemoved' === data.toasterType ) {
					vm.toasterMessage = 'Item ' + data.targetItem.item.name + ' removed succesfully!';
				}

				vm.toasterOpen = true;

				$timeout( function() {

					vm.toasterOpen = false;

				}, 4000 );

			} );


		}

	}

})();