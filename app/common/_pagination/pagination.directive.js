/**
 * Application pagination directive
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.directive( 'hbLinkVotePagination', hbLinkVotePagination );

	/**
	 * 
	 */
	function hbLinkVotePagination() {

		return {

			templateUrl: 'common/_pagination/template-pagination.html',
			restrict: 'E',
			controller: 'HbLinkVotePaginationCtrl',
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