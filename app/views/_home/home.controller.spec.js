describe( 'UNIT :: HomeCtrl', function() {

	'use strict';

	// MockHelpers is defined in the global scope and injected via karma.conf.js
	// @see `mock-helpers.js` for mock data helpers

	var __HomeCtrl,
		__scope,
		$rootScope,
		$controller,
		$timeout,
		LinkVoteChallengeService;

	beforeEach( function() {
		angular.mock.module( 'com.missofis.linkvotechallenge' );
		angular.mock.inject( function( _$rootScope_, _$controller_, _$timeout_, _LinkVoteChallengeService_ ) {
			$rootScope = _$rootScope_;
			$controller = _$controller_;
			$timeout = _$timeout_;
			LinkVoteChallengeService = _LinkVoteChallengeService_;
			__scope = $rootScope.$new(); // re-initialize scope
			__HomeCtrl = $controller( 'HomeCtrl', { $scope: __scope } );
		} );
	} );

	describe( 'HomeCtrl :: Creation', function() {
		
		it( 'should define a "links" property (hello world! test)', function() {
			expect( __HomeCtrl.links ).toBeDefined();
		} );
		
	} );

	describe( 'HomeCtrl :: Behaviour', function() {

		var _itemsUnsorted,
			_itemsSortedByCreationDate,
			_itemsSortedByVotesCount,
			_item;			

		beforeEach( function() {
			_itemsUnsorted = MockHelpers.getItemsUnsorted();
			_itemsSortedByCreationDate = MockHelpers.getItemsSortedByCreationDate();
			_itemsSortedByVotesCount = MockHelpers.getItemsSortedByVotesCount();
			_item = MockHelpers.getSingleItem();
		} );

		it( 'should sort array by votes count (and date if vote counts are identical)', function() {
			__HomeCtrl.sortItemsByVoteCount( _itemsUnsorted, false );
			expect( _itemsUnsorted ).toEqual( _itemsSortedByVotesCount );
		} );

		it( 'should sort array by creation date', function() {
			__HomeCtrl.sortItemsByCreationDate( _itemsUnsorted, false );
			expect( _itemsUnsorted ).toEqual( _itemsSortedByCreationDate );
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

	describe( 'HomeCtrl :: Depends on Another Controller', function() {

		var __AddCtrl;

		beforeEach( function() {
			angular.mock.inject( function() {
				__AddCtrl = $controller( 'AddCtrl' );
			} );
		} );

		beforeEach( function() {
			LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data to set item count to "0"
			__AddCtrl.addLink();
			$timeout.flush();
		} );

		it( 'should increase votes count by 1 (after resetting & adding a single item to app data)', function() {
			__scope = $rootScope.$new(); // re-initialize scope
			__HomeCtrl = $controller( 'HomeCtrl', { $scope: __scope } ); // re-initialize controller
			expect( __HomeCtrl.links.length ).toEqual( 1 );
			__HomeCtrl.upVote( __HomeCtrl.links[0], 0 ); // vote count: 0
			expect( __HomeCtrl.links[0].votes_count ).toEqual( 1 );
		} );

		it( 'should decrease votes count by 1 (after resetting & adding a single item to app data and upvoting this data)', function() {
			__scope = $rootScope.$new(); // re-initialize scope
			__HomeCtrl = $controller( 'HomeCtrl', { $scope: __scope } ); // re-initialize controller
			expect( __HomeCtrl.links.length ).toEqual( 1 );
			__HomeCtrl.upVote( __HomeCtrl.links[0], 0 ); // vote count: 0 (1 after this)
			__HomeCtrl.upVote( __HomeCtrl.links[0], 0 ); // vote count: 1	(2 after this, override behaviour)
			__HomeCtrl.downVote( __HomeCtrl.links[0], 0 ); // vote count: 1 again
			expect( __HomeCtrl.links[0].votes_count ).toEqual( 1 );
		} );

	} );

} );