describe( 'UNIT :: AddCtrl', function() {

	'use strict';

	// MockHelpers is defined in the global scope and injected via karma.conf.js
	// @see `mock-helpers.js` for mock data helpers

	var __AddCtrl;

	beforeEach( function() {
		angular.mock.module( 'com.missofis.linkvotechallenge' );
		angular.mock.inject( function( $controller ) {
			__AddCtrl = $controller( 'AddCtrl' );
		} );
	} );

	describe( 'AddCtrl :: Creation', function() {

		it( 'should define a "formData" property (hello world! test)', function() {
			expect( __AddCtrl.formData ).toBeDefined();
		} );
		
	} );

	describe( 'AddCtrl :: Behaviour', function() {

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
			var _formData = __AddCtrl.formData;
			__AddCtrl.addLink();
			expect( __AddCtrl.link ).toBeNull();
			$timeout.flush();
			expect( __AddCtrl.link.name ).toBe( _formData.linkName );
			expect( __AddCtrl.link.redirect_url ).toBe( _formData.linkUrl );
		} );

		it( 'should set "disableAdd" flag true before timeout, false after', function() {
			expect( __AddCtrl.disableAdd ).toBe( false ); // initial value
			__AddCtrl.addLink();
			expect( __AddCtrl.disableAdd ).toBe( true ); // addLink called
			$timeout.flush();
			expect( __AddCtrl.disableAdd ).toBe( false ); // re-stored by $timeout
		} );

		it( 'should fire "mso.showToaster" event and set proper data for it to show link added info message in toaster', function() {
			spyOn( $rootScope, '$emit' );
			__AddCtrl.formData = MockHelpers.getAddLinkFormData();
			var _item = { name: __AddCtrl.formData.linkName, redirect_url: __AddCtrl.formData.linkUrl }; // @see mock-helpers.js
			__AddCtrl.addLink();
			$timeout.flush();
			expect( $rootScope.$emit ).toHaveBeenCalledWith( 'mso.showToaster', MockHelpers.getToasterEventData( 'mso.itemAdded', _item ) );
		} );

		it( 'should clear form after item addition', function() {
			__AddCtrl.formData = MockHelpers.getAddLinkFormData();
			expect( __AddCtrl.formData ).toEqual( MockHelpers.getAddLinkFormData() );
			__AddCtrl.addLink();
			$timeout.flush();
			expect( __AddCtrl.formData ).toEqual( { linkName: '', linkUrl: '' } );
		} );

		it( 'should fill app data with 4 items via cheat', function() {
			LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data
			$httpBackend
				.expectGET( 'test/mock-data/items.json' )
				.respond( { posts: MockHelpers.getItemsUnsorted() } );
			__AddCtrl.cheetah();
			$httpBackend.flush();
			var _items = LinkVoteChallengeService.getAppData().items;
			expect( _items ).toEqual( MockHelpers.getItemsUnsorted() );
		} );

	} );

} );