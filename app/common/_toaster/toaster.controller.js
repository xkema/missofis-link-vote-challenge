/**
 * MsoLinkVoteToasterCtrl Controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.controller( 'MsoLinkVoteToasterCtrl', MsoLinkVoteToasterCtrl );

	MsoLinkVoteToasterCtrl.$inject = [ '$log', '$scope', '$rootScope', '$timeout', '$sce' ];

	/**
	 * MsoLinkVoteToasterCtrl controller
	 */
	function MsoLinkVoteToasterCtrl( $log, $scope, $rootScope, $timeout, $sce ) {

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
			
			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'MsoLinkVoteToasterCtrl' );

			// listen to modal events
			$rootScope.$on( 'mso.showToaster', function( event, data ) {

				if( 'mso.itemAdded' === data.toasterType ) {
					vm.toasterMessage = $sce.trustAsHtml( '"<strong>' + data.targetItem.item.name + '"</strong> item added!' );
				}

				else if( 'mso.itemRemoved' === data.toasterType ) {
					vm.toasterMessage = $sce.trustAsHtml( 'Item "<strong>' + data.targetItem.item.name + '</strong>" removed succesfully!' );
				}
				else if( 'mso.simpleToast' === data.toasterType ) {
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