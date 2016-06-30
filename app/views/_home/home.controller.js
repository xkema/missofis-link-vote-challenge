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

		// controller api
		vm.sortItems = _sortItems;
		vm.upVote = _upVote;
		vm.downVote = _downVote;
		vm.getAppData = _getAppData;
		vm.removeLink = _removeLink;

		// initialize controller
		_init();

		/*
		----------------------------------------------------------------
		Private API
		----------------------------------------------------------------
		*/

		// @param Array items, @param Boolean reversed 
		function _sortItems( items, dateOnly, reversed ) {

			var _reverser = 1;
			
			if( reversed ) {
				_reverser = -1;
			}

			return items.sort( function( a, b ) {
				if( dateOnly ) {
					return _reverser * ( Date.parse( b.created_at ) - Date.parse( a.created_at ) );
				}
				else {
					return _reverser * ( b.votes_count - a.votes_count ) || _reverser * ( Date.parse( b.created_at ) - Date.parse( a.created_at ) ); // b.votes_count - a.votes_count is falsy for equality, check date in this case
				}
			} );

		}

		// votes up
		function _upVote( item ) {debugger;

			LinkVoteChallengeService.upVoteItem( item );
			_sortItems( vm.links, false, false );

		}

		// votes down
		function _downVote( item ) {debugger;

			LinkVoteChallengeService.downVoteItem( item );
			_sortItems( vm.links, false, false );

		}

		// read initial items from localstorage
		function _getAppData() {

			var _appData = LinkVoteChallengeService.getAppData();
			return _appData;

		}

		// remove link
		function _removeLink( item ) {

			// add single item to storage
			LinkVoteChallengeService.removeItem( item );

		}

		// controller initialize
		function _init() {

			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'HomeCtrl' );

			vm.links = _getAppData().items;

		}

	}

})();