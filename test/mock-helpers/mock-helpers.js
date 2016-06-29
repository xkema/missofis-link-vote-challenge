/**
 * Trimmed service returned JSON objects (mock data getters)
 */
var MockHelpers = ( function() {

	return {

		getSingleItem: _getSingleItem,
		getItemsUnsorted: _getItemsUnsorted,
		getItemsSortedByVotesCount: _getItemsSortedByVotesCount,
		getItemsSortedByCreationDate: _getItemsSortedByCreationDate

	};

	/**
	 * Returns single item
	 */
	function _getSingleItem() {

		return { id: 1001, created_at: "2016-06-27T01:07:24.588-07:00", votes_count: 100 }; // 11:07:24, 1467014844588

	}

	/**
	 * Returns an unsorted items array with identical vote counts
	 */
	function _getItemsUnsorted() {

		return [
			{ id: 1001, created_at: "2016-06-27T01:07:24.588-07:00", votes_count: 100 }, // 11:07:24, 1467014844588
			{ id: 1002, created_at: "2016-06-27T01:01:26.000-07:00", votes_count: 600 }, // 11:01:26, 1467014486000
			{ id: 1003, created_at: "2016-06-27T02:04:29.829-07:00", votes_count: 300 }, // 12:04:29, 1467018269829
			{ id: 1004, created_at: "2016-06-27T10:25:50.843-07:00", votes_count: 300 }  // 20:25:50, 1467048350843
		];

	}

	/**
	 * Returns properly sorted items (sorted by votes_count then date)
	 */
	function _getItemsSortedByVotesCount() {

		return [
			{ id: 1002, created_at: "2016-06-27T01:01:26.000-07:00", votes_count: 600 }, // 11:01:26, 1467014486000
			{ id: 1004, created_at: "2016-06-27T10:25:50.843-07:00", votes_count: 300 }, // 20:25:50, 1467048350843
			{ id: 1003, created_at: "2016-06-27T02:04:29.829-07:00", votes_count: 300 }, // 12:04:29, 1467018269829
			{ id: 1001, created_at: "2016-06-27T01:07:24.588-07:00", votes_count: 100 }  // 11:07:24, 1467014844588
		];

	}

	/**
	 * Returns properly sorted items (sorted by creation date)
	 */
	function _getItemsSortedByCreationDate() {

		return [
			{ id: 1004, created_at: "2016-06-27T10:25:50.843-07:00", votes_count: 300 }, // 20:25:50, 1467048350843
			{ id: 1003, created_at: "2016-06-27T02:04:29.829-07:00", votes_count: 300 }, // 12:04:29, 1467018269829
			{ id: 1001, created_at: "2016-06-27T01:07:24.588-07:00", votes_count: 100 }, // 11:07:24, 1467014844588
			{ id: 1002, created_at: "2016-06-27T01:01:26.000-07:00", votes_count: 600 }  // 11:01:26, 1467014486000
		];

	}

} )();