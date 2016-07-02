describe( 'UNIT ::  Controller Test : HomeCtrl', function() {

	// MockHelpers is defined in the global scope and injected via karma.conf.js
	// @see `mock-helpers.js` for mock data helpers

	var __controller,
		$scope;

	beforeEach( function() {
		angular.mock.module( 'com.hepsiburada.linkvotechallenge' );
		angular.mock.inject( function( $controller, $rootScope ) {
			$scope = $rootScope.$new();
			__controller = $controller( 'HomeCtrl', { $scope: $scope } );
		} );
	} );

	describe( 'HomeCtrl :: Controller Creation', function() {

		it( 'should define a "links" property (hello world! test)', function() {
			expect( __controller.links ).toBeDefined();
		} );
		
	} );

	describe( 'HomeCtrl :: Controller Behaviour', function() {

		var _itemsUnsorted,
			_itemsSortedByCreationDate,
			_itemsSortedByVotesCount;

		// var _item,
		// 	_items,

		beforeEach( function() {
			_itemsUnsorted = MockHelpers.getItemsUnsorted();
			_itemsSortedByCreationDate = MockHelpers.getItemsSortedByCreationDate();
			_itemsSortedByVotesCount = MockHelpers.getItemsSortedByVotesCount();
		} );

		it( 'should sort array by votes count (and date if vote counts are identical)', function() {
			__controller.sortItemsByVoteCount( _itemsUnsorted, false );
			expect( _itemsUnsorted ).toEqual( _itemsSortedByVotesCount );
		} );

		it( 'should sort array by creation date', function() {
			__controller.sortItemsByCreationDate( _itemsUnsorted, false );
			expect( _itemsUnsorted ).toEqual( _itemsSortedByCreationDate );
		} );

		// it( 'should increase votes count by 1', function() {
		// 	__controller.upVote( _item ); // vote_count: 100
		// 	expect( _item.votes_count ).toEqual( 101 );
		// } );

		// it( 'should decrease votes count by 1 three times', function() {
		// 	__controller.downVote( _item ); // vote_count: 100--
		// 	__controller.downVote( _item ); // vote_count: 99--
		// 	__controller.downVote( _item ); // vote_count: 98-- (can a user decrease h(er|is)+ vote again & again?)
		// 	expect( _item.votes_count ).toEqual( 97 );
		// } );


	} );
	
	// describe( 'HomeCtrl :: Controller XHR/Service Related', function() {

		// var _initialAppData;

		// beforeEach( function() {
		// 	_initialAppData = __controller.getAppData();
		// } );

		// it( 'should read initial app data from $localStorage', function() {
		// 	expect( _initialAppData.items ).toBeDefined();
		// 	expect( _initialAppData.userCheated ).toBeDefined();
		// } );

	// } );

} );


/*

		it( 'should ...', function() {
			__controller.
		} );

*/