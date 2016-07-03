/**
 * HbLinkVoteModalCtrl Controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.controller( 'HbLinkVoteModalCtrl', HbLinkVoteModalCtrl );

	HbLinkVoteModalCtrl.$inject = [ '$log', '$scope', '$rootScope' ];

	/**
	 * HbLinkVoteModalCtrl controller
	 */
	function HbLinkVoteModalCtrl( $log, $scope, $rootScope ) {

		var vm = this;

		/*
		----------------------------------------------------------------
		Initiate public scope variables
		----------------------------------------------------------------
		*/

		// controller bindables
		vm.modalOpen = false;
		
		// controller api
		vm.closeModal = _closeModal;
		vm.doModalAction = _doModalAction;

		// internals
		var _modalData = null;

		// initialize controller
		_init();

		/*
		----------------------------------------------------------------
		Private API
		----------------------------------------------------------------
		*/

		// 
		function _closeModal() {

			vm.modalOpen = false;

		}

		//
		function _doModalAction() {

			// why am i doing this? @see "Definitely, Maybe (2008)"
			if( !_modalData ) {

				return false;

			}

			if( 'hb.removeItem' === _modalData.targetAction ) {

				// @see home.controller.js
				$rootScope.$emit( _modalData.targetAction, _modalData.targetItem );

			}

			vm.modalOpen = false;

		}
		
		/**
		 * Controller initialize
		 */
		function _init() {
			
			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'HbLinkVoteModalCtrl' );

			// listen to modal events
			$rootScope.$on( 'hb.openModal', function( event, data ) {

				_modalData = data;

				vm.modalOpen = true;				

			} );


		}

	}

})();