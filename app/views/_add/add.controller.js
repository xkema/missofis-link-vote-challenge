/**
 * Add controller
 */
(function () {

	'use strict';

	angular
		.module( 'com.hepsiburada.linkvotechallenge' )
		.controller( 'AddCtrl', AddCtrl );

	AddCtrl.$inject = [ '$log', 'LinkVoteChallengeService', '$location', '$rootScope' ];

	/**
	 * Add controller
	 */
	function AddCtrl( $log, LinkVoteChallengeService, $location, $rootScope ) {

		var vm = this;

		/*
		----------------------------------------------------------------
		Initiate public scope variables
		----------------------------------------------------------------
		*/
		
		// controller bindables
		vm.formData = { linkName: 'at-'+Date.now(), linkUrl: 'http://at-'+Date.now()+'.com' };

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

				id: Math.ceil( Math.random() * Date.now() ),
				name: vm.formData.linkName,
				redirect_url: vm.formData.linkUrl,
				created_at: Date.now(),
				votes_count: 0,
				last_voted_at: null,
				current_user_voted: false

			};

			// add single item to storage
			LinkVoteChallengeService.addItem( _item );

			// @see toaster.controller.js
			$rootScope.$emit( 'hb.showToaster', { toasterType: 'hb.itemAdded', targetItem: { item: _item } } );

			// clear form
			vm.formData = { linkName: '', linkUrl: '' };

		}

		// add items.json in one click
		function _cheetah() {

			LinkVoteChallengeService
				.getMockItemsData()
				.then( function( response ) {

					LinkVoteChallengeService.setAppData( { items: response.data.posts, userCheated: true }, false );

					vm.isUserCheated = true;
					
				} );

		}	

		// controller initialize
		function _init() {

			$log.info( '$$____ :: CONTROLLER INITIALIZE', 'AddCtrl' );

			vm.isUserCheated = LinkVoteChallengeService.getAppData().userCheated;

		}

	}

})();