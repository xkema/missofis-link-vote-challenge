/**
 * Home controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.controller( 'HomeCtrl', HomeCtrl );

	HomeCtrl.$inject = [ '$log', 'LinkVoteChallengeService' ];

	/**
	 * Home controller
	 */
	function HomeCtrl( $log, LinkVoteChallengeService ) {

		var vm = this;

		/*
		----------------------------------------------------------------
		Initiate public scope variables
		----------------------------------------------------------------
		*/
		
		// controller bindables
		vm.links = null;
		vm.listOrder = '';

		// controller api
		vm.sortItemsByCreationDate = _sortItemsByCreationDate;
		vm.sortItemsByVoteCount = _sortItemsByVoteCount;
		vm.upVote = _upVote;
		vm.downVote = _downVote;
		vm.getAppData = _getAppData;
		vm.removeLink = _removeLink;
		vm.changeOrder = _changeOrder;

		// internals
		var _appData = null;

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

			var _item = LinkVoteChallengeService.upVoteItem( item );
			vm.links[ index ] = _item;
			// re-sort items if list is not ordered default order (by creation date)
			if( '' !== vm.listOrder ) {
				var isReversed = 'increasing' === vm.listOrder ? true : false;
				vm.sortItemsByVoteCount( _appData.items, isReversed );
			}

		}

		// votes down
		function _downVote( item, index ) {

			var _item = LinkVoteChallengeService.downVoteItem( item );
			vm.links[ index ] = _item;
			// re-sort items if list is not ordered default order (by creation date)
			if( '' !== vm.listOrder ) {
				var isReversed = 'increasing' === vm.listOrder ? true : false;
				vm.sortItemsByVoteCount( _appData.items, isReversed );
			}

		}

		// read initial items from storage
		function _getAppData() {

			return LinkVoteChallengeService.getAppData();

		}

		// remove link
		function _removeLink( item, index ) {

			// remove link from storage
			var _itemRemoved = LinkVoteChallengeService.removeItem( item );

			// show toast
			if( _itemRemoved ) {

				vm.links.splice( index, 1 );

				$log.info( '++____ :: Item removed, show toaster!' );

			}

		}

		// list order
		function _changeOrder() {

			if( '' === vm.listOrder ) {
				_sortItemsByCreationDate( _appData.items, false );				
			}
			else if( 'decreasing' === vm.listOrder ) {
				_sortItemsByVoteCount( _appData.items, false );
			}
			else if( 'increasing' === vm.listOrder ) {
				_sortItemsByVoteCount( _appData.items, true );
			}

		}

		// controller initialize
		function _init() {

			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'HomeCtrl' );

			_appData = _getAppData();

			vm.links = _sortItemsByCreationDate( _appData.items, false );

		}

	}

})();