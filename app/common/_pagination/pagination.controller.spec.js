describe( 'UNIT :: MsoLinkVotePaginationCtrl', function() {

	'use strict';

	// MockHelpers is defined in the global scope and injected via karma.conf.js
	// @see `mock-helpers.js` for mock data helpers

	var $componentController,
		__PaginationCtrl;

	beforeEach( function() {
		angular.mock.module( 'com.missofis.linkvotechallenge' );
		angular.mock.inject( function( _$componentController_ ) {
			$componentController = _$componentController_;
			__PaginationCtrl = $componentController( 'msoLinkVotePagination', null, {
				numItems: 25,
				itemsPerPage: 5,
				currentPage: 1
			} );
		} );
	} );

	describe( 'MsoLinkVotePaginationCtrl :: Behaviour', function() {

		it( 'should define a "numPagesCalculated" property (hello world! test)', function() {			
			expect( __PaginationCtrl.numPagesCalculated ).toBeDefined();
		} );

		it( 'should calculate pages count 5 for 25 items, 6 for 26 items, 7 for 31 items', function() {			
			__PaginationCtrl.updatePagination();
			expect( __PaginationCtrl.numPagesCalculated ).toBe( 5 );
			__PaginationCtrl.numItems = 26;
			__PaginationCtrl.updatePagination();
			expect( __PaginationCtrl.numPagesCalculated ).toBe( 6 );
			__PaginationCtrl.numItems = 31;
			__PaginationCtrl.updatePagination();
			expect( __PaginationCtrl.numPagesCalculated ).toBe( 7 );
		} );

	} );

} );