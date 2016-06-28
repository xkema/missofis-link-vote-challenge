describe( 'UNIT ::  Controller Test : HomeCtrl', function() {

	var _controller;

	beforeEach( function() {
		angular.mock.module( 'com.hepsiburada.linkvotechallenge' );
		angular.mock.inject( function( $controller ) {
			_controller = $controller( 'HomeCtrl' );
		} );
	} );

	describe( 'HomeCtrl :: Controller Creation', function() {

		it( 'should define a null "links" property', function() {
			expect( _controller.links ).toBeNull();
		} );
		
	} );

} );