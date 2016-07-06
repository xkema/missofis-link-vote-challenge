/**
 * Application toaster component
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.component( 'msoLinkVoteToaster', {

			templateUrl: function() {
				return 'common/_toaster/template-toaster.html';
			},
			controller: 'MsoLinkVoteToasterCtrl',
			controllerAs: 'vm_'

		} );

})();