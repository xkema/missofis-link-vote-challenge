/**
 * MsoLinkVotePaginationCtrl Controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.controller( 'MsoLinkVotePaginationCtrl', MsoLinkVotePaginationCtrl );

	MsoLinkVotePaginationCtrl.$inject = [ '$log', '$scope' ];

	/**
	 * MsoLinkVotePaginationCtrl controller
	 */
	function MsoLinkVotePaginationCtrl( $log, $scope ) {

		var vm = this;

		/*
		----------------------------------------------------------------
		Initiate public scope variables
		----------------------------------------------------------------
		*/

		// controller bindables 
		// @see component definition for other bindables; "numItems", "itemsPerPage", "currentPage", "updatePageData"
		vm.numPagesCalculated = 1;
		
		// controller api
		vm.updatePagination = _updatePagination;
		vm.updatePage = _updatePage;

		// initialize controller
		_init();

		/*
		----------------------------------------------------------------
		Private API
		----------------------------------------------------------------
		*/

		// update outside data (items of parent scope, "listing")
		function _updatePage( direction ) {

			if( 'next' === direction && vm.currentPage !== vm.numPagesCalculated ) {
				vm.currentPage++;
			}
			else if( 'prev' === direction && vm.currentPage !== 1 ) {
				vm.currentPage--;
			}
			else {
				return false;
			}

			vm.updatePageData( { page: vm.currentPage } );

		}

		// recalculates pagination
		function _updatePagination() {

			if( ! isNaN( parseFloat( vm.numItems ) ) && ! isNaN( parseFloat( vm.itemsPerPage ) ) ) {

				vm.numPagesCalculated = Math.ceil( vm.numItems / vm.itemsPerPage );

			}

		}
		
		/**
		 * Controller initialize
		 */
		function _init() {
			
			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'MsoLinkVotePaginationCtrl' );

			$scope.$watch( 'vm_.numItems', function( newValue, oldValue ) {

				if( parseInt( newValue ) <= parseInt( vm.itemsPerPage ) ) {
					vm.numPagesCalculated = 1;
				}
				else {
					_updatePagination();				
				}

			} );

		}

	}

})();