/**
 * LinkVoteChallenge services & utilities
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.factory( 'LinkVoteChallengeService', LinkVoteChallengeService );

	LinkVoteChallengeService.$inject = [ '$http' ];

	/**
	 * LinkVoteChallenge
	 */
	function LinkVoteChallengeService( $http ) {

		// reveal service api
		return {

			// services
			getMockItemsData: _getMockItemsData,
			addItem: _addItem,
			removeItem: _removeItem,
			upVoteItem: _upVoteItem,
			downVoteItem: _downVoteItem,
			// utilities
			initAppData: _initAppData,
			getAppData: _getAppData,
			setAppData: _setAppData

		};

		/*
		----------------------------------------------------------------
		LinkVoteChallenge Services
		----------------------------------------------------------------
		*/

		/**
		 * Get mock items data from json
		 */
		function _getMockItemsData() {

			return $http( {

				method: 'GET',
				url: 'test/mock-data/items.json'

			} );

		}

		/**
		 * Add item to storage object
		 */
		function _addItem( item ) {

			var _appData = _getAppData();

			// originally a service query w|itemId :)
			_appData.items.unshift( item );

			_setAppData( { items: _appData.items }, true );

			return true;

		}

		/**
		 * Remove item from storage
		 */
		function _removeItem( item ) {

			var _appData = _getAppData();

			// originally a service query w|itemId :)
			_appData.items.forEach( function( currentValue, index ) {
				if( item.id === currentValue.id ) {
					_appData.items.splice( index, 1 );
				}
			} );

			_setAppData( { items: _appData.items }, true );

			return true;

		}

		/**
		 * Increase item votes count
		 * 
		 * @return Updated item
		 */
		function _upVoteItem( item ) {

			var _appData = _getAppData();

			var _item = null;

			// originally a service query w|itemId :)
			_appData.items.forEach( function( currentValue, index ) {
				if( item.id === currentValue.id ) {
					currentValue.votes_count++;
					currentValue.current_user_voted = true;
					currentValue.last_voted_at = new Date();
					// set modified item to return
					_item = currentValue;
				}
			} );

			_setAppData( { items: _appData.items }, true );

			return _item;

		}

		/**
		 * Decrease item votes count
		 */
		function _downVoteItem( item ) {

			var _appData = _getAppData();

			var _item = null;

			// originally a service query w|itemId :)
			_appData.items.forEach( function( currentValue, index ) {
				if( item.id === currentValue.id ) {
					currentValue.votes_count--;
					currentValue.current_user_voted = false;
					currentValue.last_voted_at = new Date();
					// set modified item to return
					_item = currentValue;
				}
			} );

			_setAppData( { items: _appData.items }, true );

			return _item;

		}	

		/*
		----------------------------------------------------------------
		LinkVoteChallenge Utilities
		----------------------------------------------------------------
		*/

		/**
		 * Initializes app sessionStorage object
		 */
		function _initAppData() {

			var _appData = {

				items: [],
				userCheated: false

			};

			if( null === sessionStorage.getItem( 'hblinkvotechallenge' ) ) {
				sessionStorage.setItem( 'hblinkvotechallenge', JSON.stringify( _appData ) );
			}

		}

		/**
		 * Get app sessionStorage data object
		 */
		function _getAppData() {

			return JSON.parse( sessionStorage.getItem( 'hblinkvotechallenge' ) );

		}

		/**
		 * Set app sessionStorage data object
		 * `data` param expected as an object contains "items" array and "userCheated" flag
		 * 
		 * @param Object data
		 * @param Boolean overwrite
		 */
		function _setAppData( data, overwrite ) {

			// todo :: check availability again?

			var _appData = _getAppData();

			if( data.items ) {
				_appData.items = overwrite ? data.items : _appData.items.concat( data.items );
			}
			if( data.userCheated ) {
				_appData.userCheated = data.userCheated;
			}

			sessionStorage.setItem( 'hblinkvotechallenge', JSON.stringify( _appData ) );

		}

	}

})();