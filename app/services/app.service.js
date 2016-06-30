/**
 * LinkVoteChallenge services & utilities
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.factory( 'LinkVoteChallengeService', LinkVoteChallengeService );

	LinkVoteChallengeService.$inject = [ '$http', '$localStorage' ];

	/**
	 * LinkVoteChallenge
	 */
	function LinkVoteChallengeService( $http, $localStorage ) {

		// reveal service api
		return {

			// services
			getMockItemsData: _getMockItemsData,
			addItem: _addItem,
			removeItem: _removeItem,			
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

			$localStorage.hblinkvotechallenge.items.unshift( item );

		}

		/**
		 * Remove item from storage
		 */
		function _removeItem( item ) {

			$localStorage.hblinkvotechallenge.items.splice( $localStorage.hblinkvotechallenge.items.indexOf( item ), 1 );

		}	

		/*
		----------------------------------------------------------------
		LinkVoteChallenge Utilities
		----------------------------------------------------------------
		*/

		/**
		 * Initializes app localStorage object
		 */
		function _initAppData() {

			$localStorage.hblinkvotechallenge = $localStorage.hblinkvotechallenge || {

				items: [],
				userCheated: false

			};

		}

		/**
		 * Get app localStorage data object
		 */
		function _getAppData() {

			return $localStorage.hblinkvotechallenge;

		}

		/**
		 * Set app localStorage data object
		 * 
		 * @param items
		 * @param userCheated
		 */
		function _setAppData( items, userCheated ) {

			$localStorage.hblinkvotechallenge = $localStorage.hblinkvotechallenge || {};

			if( items ) {
				$localStorage.hblinkvotechallenge.items = $localStorage.hblinkvotechallenge.items.concat( items );
			}
			if( userCheated ) {
				$localStorage.hblinkvotechallenge.userCheated = userCheated;
			}

		}

	}

})();