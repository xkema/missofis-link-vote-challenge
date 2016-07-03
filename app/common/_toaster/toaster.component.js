/**
 * Application toaster directive
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.component( 'hbLinkVoteToaster', {

			templateUrl: function() {
				return 'common/_toaster/template-toaster.html';
			},
			controller: 'HbLinkVoteToasterCtrl',
			controllerAs: 'vm_'

		} );

})();