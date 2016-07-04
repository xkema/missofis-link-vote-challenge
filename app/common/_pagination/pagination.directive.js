/**
 * Application pagination directive
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.directive( 'msoLinkVotePagination', msoLinkVotePagination );

	/**
	 * 
	 */
	function msoLinkVotePagination() {

		return {

			templateUrl: 'common/_pagination/template-pagination.html',
			restrict: 'E',
			controller: 'MsoLinkVotePaginationCtrl',
			controllerAs: 'vm_',
			bindToController: true,
			scope: {
				numItems: '@',
				itemsPerPage: '@',
				currentPage: '=',
				updatePageData: '&'
			}

		};

	}

})();