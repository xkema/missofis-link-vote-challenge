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

		// internals
		var _toasterPromise = null;

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

				var _previousMessage = vm.toasterMessage;

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

				// check for previous toaster and cancel if it is not finished yet (restarts new toaster's timer)
				if( vm.toasterOpen ) {
					vm.toasterMessage = $sce.trustAsHtml( vm.toasterMessage + '<br>' + _previousMessage );
					$timeout.cancel( _toasterPromise );
				}

				vm.toasterOpen = true;

				_toasterPromise = $timeout( function() {

					vm.toasterOpen = false;

					_toasterPromise = null;

				}, 4000 );

			} );


		}

	}

})();