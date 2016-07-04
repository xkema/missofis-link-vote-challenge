/**
 * Application toaster directive
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.component( 'hbLinkVoteToaster', {

			templateUrl: function() {
				return 'common/_toaster/template-toaster.html';
			},
			controller: 'HbLinkVoteToasterCtrl',
			controllerAs: 'vm_'

		} );

})();