/**
 * Trimmed service returned JSON objects (mock data getters)
 */
var MockHelpers = ( function() {

	'use strict';

	return {

		getSingleItem: _getSingleItem,
		getItemsUnsorted: _getItemsUnsorted,
		getItemsSortedByVotesCount: _getItemsSortedByVotesCount,
		getItemsSortedByCreationDate: _getItemsSortedByCreationDate,
		getAddLinkFormData: _getAddLinkFormData,
		getToasterEventData: _getToasterEventData,
		getModalEventData: _getModalEventData

	};

	/**
	 * Returns single item
	 */
	function _getSingleItem() {

		return { id: 1001, created_at: "2016-06-21T01:22:33.588-07:00", votes_count: 100, last_voted_at: "2016-06-22T01:22:33.588-07:00" };

	}

	/**
	 * Returns an unsorted items array with identical vote counts
	 */
	function _getItemsUnsorted() {

		return [
			{ id: 1001, created_at: "2016-06-21T01:22:33.588-07:00", votes_count: 100, last_voted_at: "2016-06-22T01:22:33.588-07:00" },
			{ id: 1002, created_at: "2016-06-08T01:22:33.588-07:00", votes_count: 600, last_voted_at: "2016-06-09T01:22:33.588-07:00" },
			{ id: 1003, created_at: "2016-06-28T01:22:33.588-07:00", votes_count: 300, last_voted_at: "2016-06-29T01:22:33.588-07:00" },
			{ id: 1004, created_at: "2016-06-19T01:22:33.588-07:00", votes_count: 300, last_voted_at: "2016-06-20T01:22:33.588-07:00" }
		];

	}

	/**
	 * Returns properly sorted items (sorted by votes_count then date)
	 */
	function _getItemsSortedByVotesCount() {

		return [
			{ id: 1002, created_at: "2016-06-08T01:22:33.588-07:00", votes_count: 600, last_voted_at: "2016-06-09T01:22:33.588-07:00" },
			{ id: 1003, created_at: "2016-06-28T01:22:33.588-07:00", votes_count: 300, last_voted_at: "2016-06-29T01:22:33.588-07:00" },
			{ id: 1004, created_at: "2016-06-19T01:22:33.588-07:00", votes_count: 300, last_voted_at: "2016-06-20T01:22:33.588-07:00" },
			{ id: 1001, created_at: "2016-06-21T01:22:33.588-07:00", votes_count: 100, last_voted_at: "2016-06-22T01:22:33.588-07:00" }
		];

	}

	/**
	 * Returns properly sorted items (sorted by creation date)
	 */
	function _getItemsSortedByCreationDate() {

		return [
			{ id: 1003, created_at: "2016-06-28T01:22:33.588-07:00", votes_count: 300, last_voted_at: "2016-06-29T01:22:33.588-07:00" },
			{ id: 1001, created_at: "2016-06-21T01:22:33.588-07:00", votes_count: 100, last_voted_at: "2016-06-22T01:22:33.588-07:00" },
			{ id: 1004, created_at: "2016-06-19T01:22:33.588-07:00", votes_count: 300, last_voted_at: "2016-06-20T01:22:33.588-07:00" },
			{ id: 1002, created_at: "2016-06-08T01:22:33.588-07:00", votes_count: 600, last_voted_at: "2016-06-09T01:22:33.588-07:00" }
		];

	}

	/**
	 * Returns add link form data
	 */
	function _getAddLinkFormData() {

		return {
			linkName: 'at-tester-data',
			linkUrl: 'http://at-tester-data.com'
		};

	}

	/**
	 * Returns data for toaster event
	 * 
	 * @param toastType
	 * @param item
	 */
	function _getToasterEventData( toastType, item ) {
	
		return {
			toasterType: toastType,
			targetItem: {
				item: item
			}
		};
	
	}

	/**
	 * Returns data for modal event
	 * 
	 * @param targetAction
	 */
	function _getModalEventData( targetAction ) {

		return {
			targetAction: targetAction,
			targetItem: {
				item: _getSingleItem(),
				index: 0
			}
		};
	
	}

} )();