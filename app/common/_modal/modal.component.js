/**
 * Application modal directive
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.component( 'hbLinkVoteModal', {

			templateUrl: function() {
				return 'common/_modal/template-modal.html';
			},
			controller: 'HbLinkVoteModalCtrl',
			controllerAs: 'vm_'

		} );

})();