/**
 * MsoLinkVoteModalCtrl Controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.controller( 'MsoLinkVoteModalCtrl', MsoLinkVoteModalCtrl );

	MsoLinkVoteModalCtrl.$inject = [ '$log', '$scope', '$rootScope' ];

	/**
	 * MsoLinkVoteModalCtrl controller
	 */
	function MsoLinkVoteModalCtrl( $log, $scope, $rootScope ) {

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
		vm.modalItem = null;

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

			if( 'mso.removeItem' === _modalData.targetAction ) {

				// @see home.controller.js
				$rootScope.$emit( _modalData.targetAction, _modalData.targetItem );

			}

			vm.modalOpen = false;

		}
		
		/**
		 * Controller initialize
		 */
		function _init() {
			
			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'MsoLinkVoteModalCtrl' );

			// listen to modal events
			$rootScope.$on( 'mso.openModal', function( event, data ) {

				_modalData = data;

				vm.modalItem = _modalData.targetItem.item;

				vm.modalOpen = true;				

			} );


		}

	}

})();