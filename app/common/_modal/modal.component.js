/**
 * Application modal directive
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.directive( 'hbLinkVoteModal', hbLinkVoteModal );

	/**
	 * 
	 */
	function hbLinkVoteModal() {

		return {

			templateUrl: function() {
				return 'common/_modal/template-modal.html';
			},
			controller: 'HbLinkVoteModalCtrl',
			controllerAs: 'vm_'

		};

	}

})();