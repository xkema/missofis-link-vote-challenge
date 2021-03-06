describe( 'UNIT :: HomeCtrl', function() {

	'use strict';

	// MockHelpers is defined in the global scope and injected via karma.conf.js
	// @see `mock-helpers.js` for mock data helpers

	var __HomeCtrl,
		__AddCtrl,
		__scope,
		$rootScope,
		$controller,
		$timeout,
		$httpBackend,
		LinkVoteChallengeService;

	beforeEach( function() {
		angular.mock.module( 'com.missofis.linkvotechallenge' );
		angular.mock.inject( function( _$rootScope_, _$controller_, _$timeout_, _$httpBackend_, _LinkVoteChallengeService_ ) {
			$rootScope = _$rootScope_;
			$controller = _$controller_;
			$timeout = _$timeout_;
			$httpBackend = _$httpBackend_;
			LinkVoteChallengeService = _LinkVoteChallengeService_;
			__scope = $rootScope.$new(); // re-initialize scope
			__AddCtrl = $controller( 'AddCtrl' );
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
			// cheat & add 4 items before each test
			LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data
			$httpBackend.expectGET( 'test/mock-data/items.json' ).respond( { posts: MockHelpers.getItemsUnsorted() } );
			__AddCtrl.cheetah();
			$httpBackend.flush();
			__HomeCtrl = $controller( 'HomeCtrl', { $scope: __scope } ); // create controller right after setting up new data
		} );

		it( 'should define a "links" property (hello world! test)', function() {
			expect( __HomeCtrl.links ).toBeDefined();
		} );

		it( 'should sort items by creation date at startup', function() {
			// home controller fed by beforeEach block above with MockHelpers.getItemsUnsorted()
			expect( __HomeCtrl.links ).toEqual( MockHelpers.getItemsSortedByCreationDate() );
		} );
		
		it( 'should increase votes count by 1', function() {
			__HomeCtrl.upVote( __HomeCtrl.links[0], 0 ); // vote count: 300
			expect( __HomeCtrl.links[0].votes_count ).toEqual( 301 );
		} );

		it( 'should increase votes count by 2 and decrease votes count by 1', function() {
			__HomeCtrl.upVote( __HomeCtrl.links[0], 0 ); // vote count: 300 (301 after this)
			__HomeCtrl.upVote( __HomeCtrl.links[0], 0 ); // vote count: 301	(302 after this, override behaviour)
			__HomeCtrl.downVote( __HomeCtrl.links[0], 0 ); // vote count: 301 again
			expect( __HomeCtrl.links[0].votes_count ).toEqual( 301 );
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
			spyOn( __HomeCtrl, 'sortItemsByVoteCount' );
			__HomeCtrl.listOrder = 'not default'; // set listOrder to anything other than default ''
			__HomeCtrl.upVote( __HomeCtrl.links[0], 0 );
			expect( __HomeCtrl.sortItemsByVoteCount ).toHaveBeenCalled();
		} );

		it( 'should call sort method after downvoting an item', function() {
			spyOn( __HomeCtrl, 'sortItemsByVoteCount' );
			__HomeCtrl.listOrder = 'not default'; // set listOrder to anything other than default ''
			__HomeCtrl.downVote( __HomeCtrl.links[0], 0 );
			expect( __HomeCtrl.sortItemsByVoteCount ).toHaveBeenCalled();
		} );

		it( 'should fire "mso.openModal" event and set proper data for it', function() {
			spyOn( $rootScope, '$broadcast' );
			__HomeCtrl.removeLinkPrelude( MockHelpers.getSingleItem(), 0 );
			expect( $rootScope.$broadcast ).toHaveBeenCalledWith( 'mso.openModal', MockHelpers.getModalEventData( 'mso.removeItem' ) );
		} );

		it( 'should call remove item method $on "mso.removeItem" event', function() {
			spyOn( __HomeCtrl, 'removeLink' );
			$rootScope.$broadcast( 'mso.removeItem', {} );
			expect( __HomeCtrl.removeLink ).toHaveBeenCalled();
		} );

		it( 'should remove item from controller and fire a "mso.showToaster" event with type of "mso.itemRemoved"', function() {
			var _numItems = __HomeCtrl.links.length;
			var _item = __HomeCtrl.links[0];
			spyOn( $rootScope, '$broadcast' );			
			__HomeCtrl.removeLink( _item, 0 ); // delete first item in links array
			$timeout.flush();			
			expect( __HomeCtrl.links.length ).toBe( _numItems - 1 );
			expect( $rootScope.$broadcast ).toHaveBeenCalledWith( 'mso.showToaster', MockHelpers.getToasterEventData( 'mso.itemRemoved', _item ) );
		} );

		it( 'should call sorting function with proper data based on "listOrder"', function() {
			spyOn( __HomeCtrl, 'sortItemsByCreationDate' );
			spyOn( __HomeCtrl, 'sortItemsByVoteCount' );
			__HomeCtrl.listOrder = '';
			__HomeCtrl.changeOrder();
			expect( __HomeCtrl.sortItemsByCreationDate ).toHaveBeenCalledWith( __HomeCtrl.links, false );
			__HomeCtrl.listOrder = 'decreasing';
			__HomeCtrl.changeOrder();
			expect( __HomeCtrl.sortItemsByVoteCount ).toHaveBeenCalledWith( __HomeCtrl.links, false );
			__HomeCtrl.listOrder = 'increasing';
			__HomeCtrl.changeOrder();
			expect( __HomeCtrl.sortItemsByVoteCount ).toHaveBeenCalledWith( __HomeCtrl.links, true );
		} );		

		it( 'should call "getItems" method on links collection changes', function() {
			spyOn( __HomeCtrl, 'getItems' );
			__HomeCtrl.links.push( __HomeCtrl.links[0] ); // change links to invoke "$scope.$watchCollection"
			__scope.$digest();
			expect( __HomeCtrl.getItems ).toHaveBeenCalled();
		} );

	} );

} );