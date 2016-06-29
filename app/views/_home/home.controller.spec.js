describe( 'UNIT ::  Controller Test : HomeCtrl', function() {

	// MockHelpers is defined in the global scope and injected via karma.conf.js
	// @see `mock-helpers.js` for mock data helpers

	var __controller;

	beforeEach( function() {
		angular.mock.module( 'com.hepsiburada.linkvotechallenge' );
		angular.mock.inject( function( $controller ) {
			__controller = $controller( 'HomeCtrl' );
		} );
	} );

	describe( 'HomeCtrl :: Controller Creation', function() {

		it( 'should define a null "links" property (hello world! test)', function() {
			expect( __controller.links ).toBeNull();
		} );
		
	} );

	describe( 'HomeCtrl :: Controller Behaviour', function() {

		var _item,
			_items,
			_sortedItemsByVotesCount,
			_sortedItemsByCreationDate;

		beforeEach( function() {
			_item = MockHelpers.getSingleItem();
			_items = MockHelpers.getItemsUnsorted(); // get dummy array for sorting
			_sortedItemsByVotesCount = MockHelpers.getItemsSortedByVotesCount();
			_sortedItemsByCreationDate = MockHelpers.getItemsSortedByCreationDate();
		} );

		it( 'should sort array by vote count (and date if vote counts are identical)', function() {
			__controller.sortItems( _items, false, false ); // checks for vote count + date sorting
			expect( _items ).toEqual( _sortedItemsByVotesCount );
		} );

		it( 'should sort array by creation date', function() {
			__controller.sortItems( _items, true, false ); // checks for date sorting
			expect( _items ).toEqual( _sortedItemsByCreationDate );
		} );

		it( 'should increase votes count by 1', function() {
			__controller.upVote( _item ); // vote_count: 100
			expect( _item.votes_count ).toEqual( 101 );
		} );

		it( 'should decrease votes count by 1 three times', function() {
			__controller.downVote( _item ); // vote_count: 100--
			__controller.downVote( _item ); // vote_count: 99--
			__controller.downVote( _item ); // vote_count: 98-- (can a user decrease h(er|is)+ vote again & again?)
			expect( _item.votes_count ).toEqual( 97 );
		} );


	} );
	
	describe( 'HomeCtrl :: Controller XHR/Service Related', function() {

		var _initialAppData;

		beforeEach( function() {
			_initialAppData = __controller.getAppData();
		} );

		it( 'should read initial app data from $localStorage', function() {
			expect( _initialAppData.items ).toBeDefined();
			expect( _initialAppData.userCheated ).toBeDefined();
		} );

	} );

} );


/*

		it( 'should ...', function() {
			__controller.
		} );

*/