/**
 * Home controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.controller( 'HomeCtrl', HomeCtrl );

	HomeCtrl.$inject = [ '$log', 'LinkVoteChallengeService', '$scope', '$timeout', '$rootScope' ];

	/**
	 * Home controller
	 */
	function HomeCtrl( $log, LinkVoteChallengeService, $scope, $timeout, $rootScope ) {

		var vm = this;

		/*
		----------------------------------------------------------------
		Initiate public scope variables
		----------------------------------------------------------------
		*/
		
		// controller bindables
		vm.links = null;
		vm.linksPaged = null;
		vm.listOrder = '';
		vm.paginationData = { itemsPerPage: 5, currentPage: 1 };
		vm.disableRemove = false;
		vm.showExtras = false;

		// controller api
		vm.sortItemsByCreationDate = _sortItemsByCreationDate;
		vm.sortItemsByVoteCount = _sortItemsByVoteCount;
		vm.upVote = _upVote;
		vm.downVote = _downVote;
		vm.getAppData = _getAppData;
		vm.removeLinkPrelude = _removeLinkPrelude;
		vm.removeLink = _removeLink;
		vm.changeOrder = _changeOrder;
		vm.getItems = _getItems;
		vm.toggleExtras = _toggleExtras;

		// initialize controller
		_init();

		/*
		----------------------------------------------------------------
		Private API
		----------------------------------------------------------------
		*/

		// sort items by date, @param Array items, @param Boolean reversed
		// newest first is default behaviour (non-reversed)
		function _sortItemsByCreationDate( items, reversed ) {

			reversed = reversed ? -1 : 1;
			
			return items.sort( function( a, b ) {
				return reversed * ( new Date( b.created_at ) - new Date( a.created_at ) );
			} );

		}

		// sort items by vote count (checks date for equality), @param Array items, @param Boolean reversed
		function _sortItemsByVoteCount( items, reversed ) {

			reversed = reversed ? -1 : 1;

			return items.sort( function( a, b ) {
				return reversed * ( b.votes_count - a.votes_count ) || reversed * ( new Date( b.last_voted_at ) - new Date( a.last_voted_at ) ); // b.votes_count - a.votes_count is falsy for equality, check date in this case
			} );

		}

		// votes up
		function _upVote( item, index ) {

			var _indexInOriginalArray = index + ( vm.paginationData.currentPage - 1 ) * vm.paginationData.itemsPerPage;

			var _item = LinkVoteChallengeService.upVoteItem( item );
			vm.links[ _indexInOriginalArray ] = _item;
			// re-sort items if list is not ordered default order (by creation date)
			if( '' !== vm.listOrder ) {
				var isReversed = 'increasing' === vm.listOrder ? true : false;
				vm.sortItemsByVoteCount( vm.links, isReversed );
			}

		}

		// votes down
		function _downVote( item, index ) {

			var _indexInOriginalArray = index + ( vm.paginationData.currentPage - 1 ) * vm.paginationData.itemsPerPage;

			var _item = LinkVoteChallengeService.downVoteItem( item );
			vm.links[ _indexInOriginalArray ] = _item;
			// re-sort items if list is not ordered default order (by creation date)
			if( '' !== vm.listOrder ) {
				var isReversed = 'increasing' === vm.listOrder ? true : false;
				vm.sortItemsByVoteCount( vm.links, isReversed );
			}

		}

		// read initial items from storage
		function _getAppData() {

			return LinkVoteChallengeService.getAppData();

		}

		// remove link prompter
		function _removeLinkPrelude( item, index ) {

			var _indexInOriginalArray = index + ( vm.paginationData.currentPage - 1 ) * vm.paginationData.itemsPerPage;

			// @see modal.controller.js
			$rootScope.$broadcast( 'mso.openModal', { targetAction: 'mso.removeItem', targetItem: { item: item, index: _indexInOriginalArray } } );

		}

		// remove link
		function _removeLink( item, index ) {

			// remove link from storage
			var _itemRemoved = LinkVoteChallengeService.removeItem( item );

			// disable further removals for 1s
			vm.disableRemove = true;

			// set timeout to wait localstorage update (~1s enough?)
			$timeout( function() {

				// enable remove
				vm.disableRemove = false;
				
				// show toast
				if( _itemRemoved ) {

					vm.links.splice( index, 1 );

					// @see toaster.controller.js
					$rootScope.$broadcast( 'mso.showToaster', { toasterType: 'mso.itemRemoved', targetItem: { item: item } } );

				}

			}, 1000 );

		}

		// list order
		function _changeOrder() {

			if( '' === vm.listOrder ) {
				vm.sortItemsByCreationDate( vm.links, false );
			}
			else if( 'decreasing' === vm.listOrder ) {
				vm.sortItemsByVoteCount( vm.links, false );
			}
			else if( 'increasing' === vm.listOrder ) {
				vm.sortItemsByVoteCount( vm.links, true );
			}

		}

		// get items fo r pagination
		function _getItems( pageNumber ) {

			if( 0 !== vm.links.length && pageNumber > Math.ceil( vm.links.length / vm.paginationData.itemsPerPage ) ) {
				vm.paginationData.currentPage = --pageNumber;
			}

			vm.linksPaged = vm.links.slice( ( pageNumber - 1 ) * vm.paginationData.itemsPerPage, pageNumber * vm.paginationData.itemsPerPage );

		}

		// toggle visibility of ectra content
		function _toggleExtras() {

			vm.showExtras = !vm.showExtras;

		}

		// controller initialize
		function _init() {

			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'HomeCtrl' );

			var _appData = _getAppData();

			vm.links = _sortItemsByCreationDate( _appData.items, false );

			if( 0 === vm.links.length ) {

				// @see toaster.controller.js
				$rootScope.$broadcast( 'mso.showToaster', { toasterType: 'mso.simpleToast', message: 'No items to list, add some!' } );

			}

			$scope.$watchCollection( 'vm.links', function() {

				vm.getItems( vm.paginationData.currentPage );

			} );

			// listen to modal events
			$scope.$on( 'mso.removeItem', function( event, data ) {

				vm.removeLink( data.item, data.index );

			} );

		}

	}

})();