/**
 * HbLinkVoteToasterCtrl Controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.controller( 'HbLinkVoteToasterCtrl', HbLinkVoteToasterCtrl );

	HbLinkVoteToasterCtrl.$inject = [ '$log', '$scope', '$rootScope', '$timeout', '$sce' ];

	/**
	 * HbLinkVoteToasterCtrl controller
	 */
	function HbLinkVoteToasterCtrl( $log, $scope, $rootScope, $timeout, $sce ) {

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
					vm.toasterMessage = $sce.trustAsHtml( '"<strong>' + data.targetItem.item.name + '"</strong> item added!' );
				}

				else if( 'hb.itemRemoved' === data.toasterType ) {
					vm.toasterMessage = $sce.trustAsHtml( 'Item "<strong>' + data.targetItem.item.name + '</strong>" removed succesfully!' );
				}
				else if( 'hb.simpleToast' === data.toasterType ) {
					vm.toasterMessage = $sce.trustAsHtml( data.message );
				}
				else {
					return false;
				}

				vm.toasterOpen = true;

				$timeout( function() {

					vm.toasterOpen = false;

				}, 4000 );

			} );


		}

	}

})();