/**
 * Application pagination component
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.component( 'msoLinkVotePagination', {

			templateUrl: function() {
				return 'common/_pagination/template-pagination.html';
			},
			controller: 'MsoLinkVotePaginationCtrl',
			controllerAs: 'vm_',
			bindings: {
				numItems: '@',
				itemsPerPage: '@',
				currentPage: '=',
				updatePageData: '&'
			}

		} );

})();