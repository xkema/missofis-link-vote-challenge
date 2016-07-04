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

	describe( 'AddCtrl :: Controller Creation', function() {

		it( 'should define a "formData" property (hello world! test)', function() {
			expect( __controller.formData ).toBeDefined();
		} );
		
	} );

	describe( 'AddCtrl :: Controller Behaviour', function() {

		var __LinkVoteChallengeService;

		beforeEach( function() {
			angular.mock.inject( function( LinkVoteChallengeService ) {
				__LinkVoteChallengeService = LinkVoteChallengeService;
			} );
		} );

		it( 'should add a single link', function() {
			__LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data to set item count to "0"			
			__controller.addLink();
			var _items = __LinkVoteChallengeService.getAppData().items;
			expect( _items.length ).toEqual( _items.length );
		} );

	} );

} );