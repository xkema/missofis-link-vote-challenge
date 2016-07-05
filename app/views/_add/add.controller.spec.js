describe( 'UNIT ::  Controller Test : AddCtrl', function() {

	// MockHelpers is defined in the global scope and injected via karma.conf.js
	// @see `mock-helpers.js` for mock data helpers

	var __controller;

	beforeEach( function() {
		angular.mock.module( 'com.missofis.linkvotechallenge' );
		angular.mock.inject( function( $controller ) {
			__controller = $controller( 'AddCtrl' );
		} );
	} );

	describe( 'AddCtrl :: Controller Creation :', function() {

		it( 'should define a "formData" property (hello world! test)', function() {
			expect( __controller.formData ).toBeDefined();
		} );
		
	} );

	describe( 'AddCtrl :: Controller Behaviour :', function() {

		var LinkVoteChallengeService,
			$timeout,
			$rootScope,
			$httpBackend;

		beforeEach( function() {
			angular.mock.inject( function( _LinkVoteChallengeService_, _$timeout_, _$rootScope_, _$httpBackend_ ) {
				LinkVoteChallengeService = _LinkVoteChallengeService_;
				$timeout = _$timeout_;
				$rootScope = _$rootScope_;
				$httpBackend = _$httpBackend_;
			} );
		} );

		it( 'should add a single link', function() {
			LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data to set item count to "0"
			__controller.addLink();
			var _items = LinkVoteChallengeService.getAppData().items; // it should check updated item data which returns back from service (or service succes object, this is a no-service falsy check)
			expect( _items.length ).toEqual( 1 );
		} );

		it( 'should set "disableAdd" flag true before timeout, false after', function() {
			expect( __controller.disableAdd ).toBe( false ); // initial value
			__controller.addLink();
			expect( __controller.disableAdd ).toBe( true ); // addLink called
			$timeout.flush();
			expect( __controller.disableAdd ).toBe( false ); // re-stored by $timeout
		} );

		it( 'should fire "mso.showToaster" event and set proper data for it to show link added info message in toaster', function() {
			spyOn( $rootScope, '$emit' );
			__controller.formData = MockHelpers.getAddLinkFormData();
			var _item = { name: __controller.formData.linkName, redirect_url: __controller.formData.linkUrl }; // @see mock-helpers.js
			__controller.addLink();
			$timeout.flush();
			expect( $rootScope.$emit ).toHaveBeenCalledWith( 'mso.showToaster', MockHelpers.getToasterEventData( 'mso.itemAdded', _item ) );
		} );

		it( 'should clear form after item addition', function() {
			__controller.formData = MockHelpers.getAddLinkFormData();
			expect( __controller.formData ).toEqual( MockHelpers.getAddLinkFormData() );
			__controller.addLink();
			$timeout.flush();
			expect( __controller.formData ).toEqual( { linkName: '', linkUrl: '' } );
		} );

		it( 'should fill app data with 4 items via cheat', function() {
			LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data
			$httpBackend
				.expectGET( 'test/mock-data/items.json' )
				.respond( { posts: MockHelpers.getItemsUnsorted() } );
			__controller.cheetah();
			$httpBackend.flush();
			var _items = LinkVoteChallengeService.getAppData().items;
			expect( _items ).toEqual( MockHelpers.getItemsUnsorted() );
		} );

	} );

} );