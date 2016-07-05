/**
 * Add controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.missofis.linkvotechallenge' )
		.controller( 'AddCtrl', AddCtrl );

	AddCtrl.$inject = [ '$log', 'LinkVoteChallengeService', '$location', '$rootScope', '$timeout' ];

	/**
	 * Add controller
	 */
	function AddCtrl( $log, LinkVoteChallengeService, $location, $rootScope, $timeout ) {

		var vm = this;

		/*
		----------------------------------------------------------------
		Initiate public scope variables
		----------------------------------------------------------------
		*/
		
		// controller bindables
		vm.disableAdd = false;
		vm.formData = {
			linkName: 'at-' + Date.now(),
			linkUrl: 'http://at-' + Date.now() + '.com'
		};
		vm.link = null;

		// controller api
		vm.addLink = _addLink;
		vm.cheetah = _cheetah;
		vm.isUserCheated = true; // assume that user already cheated to hide element from view at startup

		// initialize controller
		_init();

		/*
		----------------------------------------------------------------
		Private API
		----------------------------------------------------------------
		*/

		// add new link
		function _addLink() {

			var _item = {

				name: vm.formData.linkName,
				redirect_url: vm.formData.linkUrl

			};

			// disable further removals for 1s
			vm.disableAdd = true;

			// set timeout to wait localstorage update (~1s enough?)
			$timeout( function() {

				// add single item to storage (_itemAdded is dummy server response, newly added item)
				var _itemAdded = LinkVoteChallengeService.addItem( _item );

				// disable further removals for 1s
				vm.disableAdd = false;

				if( _itemAdded ) {

					// @see toaster.controller.js
					$rootScope.$emit( 'mso.showToaster', { toasterType: 'mso.itemAdded', targetItem: { item: _item } } );

					vm.link = _itemAdded;

					// clear form
					vm.formData = { linkName: '', linkUrl: '' };

				}

			}, 1000 );

		}

		// add items.json in one click
		function _cheetah() {

			// disable further removals for 1s
			vm.disableAdd = true;

			LinkVoteChallengeService
				.getMockItemsData()
				.then( function( response ) {

					LinkVoteChallengeService.setAppData( { items: response.data.posts, userCheated: true }, false );

					// set timeout to wait localstorage update (~1s enough?)
					$timeout( function() {

						vm.isUserCheated = true;

						// disable further removals for 1s
						vm.disableAdd = false;

						// @see toaster.controller.js
						$rootScope.$emit( 'mso.showToaster', { toasterType: 'mso.simpleToast', message: 'You\'ve added <strong>25 items</strong> with some kind of poisonous elixir!' } );

					}, 1000 );
					
				} );

		}	

		// controller initialize
		function _init() {

			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'AddCtrl' );

			vm.isUserCheated = LinkVoteChallengeService.getAppData().userCheated;

		}

	}

})();