/**
 * Application modal component
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.component( 'msoLinkVoteModal', {

			templateUrl: function() {
				return 'common/_modal/template-modal.html';
			},
			controller: 'MsoLinkVoteModalCtrl',
			controllerAs: 'vm_'

		} );

})();