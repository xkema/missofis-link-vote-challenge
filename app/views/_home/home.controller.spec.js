describe( 'UNIT ::  Controller Test : HomeCtrl', function() {

	// MockHelpers is defined in the global scope and injected via karma.conf.js
	// @see `mock-helpers.js` for mock data helpers

	var __HomeCtrl,
		$scope;

	beforeEach( function() {
		angular.mock.module( 'com.missofis.linkvotechallenge' );
		angular.mock.inject( function( $controller, $rootScope ) {
			$scope = $rootScope.$new();
			__HomeCtrl = $controller( 'HomeCtrl', { $scope: $scope } );
		} );
	} );

	describe( 'HomeCtrl :: Controller Creation', function() {

		it( 'should define a "links" property (hello world! test)', function() {
			expect( __HomeCtrl.links ).toBeDefined();
		} );
		
	} );

	describe( 'HomeCtrl :: Controller Behaviour', function() {

		var _itemsUnsorted,
			_itemsSortedByCreationDate,
			_itemsSortedByVotesCount,
			_item,
			LinkVoteChallengeService,
			__AddCtrl,
			$rootScope,
			$timeout;

		beforeEach( function() {
			_itemsUnsorted = MockHelpers.getItemsUnsorted();
			_itemsSortedByCreationDate = MockHelpers.getItemsSortedByCreationDate();
			_itemsSortedByVotesCount = MockHelpers.getItemsSortedByVotesCount();
			_item = MockHelpers.getSingleItem();
		} );

		beforeEach( function() {
			angular.mock.inject( function( _LinkVoteChallengeService_, $controller, _$rootScope_, _$timeout_ ) {
				LinkVoteChallengeService = _LinkVoteChallengeService_;
				__AddCtrl = $controller( 'AddCtrl' );
				$rootScope = _$rootScope_;
				$timeout = _$timeout_;
			} );
		} );

		it( 'should sort array by votes count (and date if vote counts are identical)', function() {
			__HomeCtrl.sortItemsByVoteCount( _itemsUnsorted, false );
			expect( _itemsUnsorted ).toEqual( _itemsSortedByVotesCount );
		} );

		it( 'should sort array by creation date', function() {
			__HomeCtrl.sortItemsByCreationDate( _itemsUnsorted, false );
			expect( _itemsUnsorted ).toEqual( _itemsSortedByCreationDate );
		} );

		it( 'should increase votes count by 1 (after resetting & adding a single item to app data)', function() {
			// reset app data with a single item
			LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data to set item count to "0"
			__AddCtrl.addLink();
			var _items = LinkVoteChallengeService.getAppData().items;
			expect( _items[0].votes_count ).toBe( 0 );
			__HomeCtrl.upVote( _items[0], 0 ); // vote count: 0
			expect( __HomeCtrl.links[0].votes_count ).toEqual( 1 );
		} );

		it( 'should decrease votes count by 1 (after resetting & adding a single item to app data and upvoting this data)', function() {
			// reset app data with a single item
			LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data to set item count to "0"
			__AddCtrl.addLink();
			var _items = LinkVoteChallengeService.getAppData().items;
			__HomeCtrl.upVote( _items[0], 0 ); // vote count: 0 (1 after this)
			__HomeCtrl.upVote( _items[0], 0 ); // vote count: 1	(2 after this, override behaviour)
			__HomeCtrl.downVote( _items[0], 0 );
			expect( __HomeCtrl.links[0].votes_count ).toEqual( 1 );
		} );

		it( 'should call sort method after upvoting an item', function() {
			// previous tests filled app data, skip app data setting
			var _items = LinkVoteChallengeService.getAppData().items;
			spyOn( __HomeCtrl, 'sortItemsByVoteCount' );
			__HomeCtrl.listOrder = 'not default'; // set listOrder to anything other than default ''
			__HomeCtrl.upVote( _items[0], 0 );
			expect( __HomeCtrl.sortItemsByVoteCount ).toHaveBeenCalled();
		} );

		it( 'should call sort method after downvoting an item', function() {
			// previous tests filled app data, skip app data setting
			var _items = LinkVoteChallengeService.getAppData().items;
			spyOn( __HomeCtrl, 'sortItemsByVoteCount' );
			__HomeCtrl.listOrder = 'not default'; // set listOrder to anything other than default ''
			__HomeCtrl.downVote( _items[0], 0 );
			expect( __HomeCtrl.sortItemsByVoteCount ).toHaveBeenCalled();
		} );

		it( 'should fire "mso.openModal" event and set proper data for it', function() {
			spyOn( $rootScope, '$emit' );
			__HomeCtrl.removeLinkPrelude( MockHelpers.getSingleItem(), 0 );
			expect( $rootScope.$emit ).toHaveBeenCalledWith( 'mso.openModal', MockHelpers.getModalEventData( 'mso.removeItem' ) );
		} );

		it( 'should remove item from app data and fire a "mso.showToaster" event with type of "mso.itemRemoved"', function() {
			var _numItems = __HomeCtrl.links.length;
			var _item = __HomeCtrl.links[0];
			spyOn( $rootScope, '$emit' );			
			__HomeCtrl.removeLink( _item, 0 ); // delete first item in links array
			$timeout.flush();			
			expect( __HomeCtrl.links.length ).toBe( _numItems - 1 );
			expect( $rootScope.$emit ).toHaveBeenCalledWith( 'mso.showToaster', MockHelpers.getToasterEventData( 'mso.itemRemoved', _item ) );
		} );

	} );

} );