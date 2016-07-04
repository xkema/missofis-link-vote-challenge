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

		var __LinkVoteChallengeService,
			$timeout,
			$rootScope;

		beforeEach( function() {
			angular.mock.inject( function( LinkVoteChallengeService, _$timeout_, _$rootScope_ ) {
				__LinkVoteChallengeService = LinkVoteChallengeService;
				$timeout = _$timeout_;
				$rootScope = _$rootScope_;
			} );
		} );

		it( 'should add a single link', function() {
			__LinkVoteChallengeService.setAppData( { items: [], userCheated: false }, true ); // reset app data to set item count to "0"			
			__controller.addLink();
			var _items = __LinkVoteChallengeService.getAppData().items;
			expect( _items.length ).toEqual( 1 );
		} );

		it( 'should set "disableAdd" flag true before timeout, false after', function() {
			expect( __controller.disableAdd ).toBe( false ); // initial value
			__controller.addLink();
			expect( __controller.disableAdd ).toBe( true ); // addLink called
			$timeout.flush();
			expect( __controller.disableAdd ).toBe( false ); // re-stored by $timeout
		} );

		it( 'should fire "mso.showToaster" event to show link added toaster', function() {
			spyOn( $rootScope, '$emit' );
			__controller.addLink();
			$timeout.flush();
			expect( $rootScope.$emit ).toHaveBeenCalled();
		} );

	} );

} );