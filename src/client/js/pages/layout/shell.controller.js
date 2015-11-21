(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$location', '$document', 'router', 'datacontext'];

    function ShellController($location, $document, router, datacontext) {
        var vm = this;

        var siteRepo = datacontext.getSiteRepository();

        // Properties
        vm.sites = siteRepo.sites;
        vm.currNavItem = '';

        // Functions
        vm.setActive = setActive;
        vm.isActive = isActive;
        vm.scrollToTop = scrollToTop;

        init();

        return;

        /////////// IMPLEMENTATION /////////////////
        function init() {
            // Default the current nav item based upon the URL
            router.subscribeStateChange('shell', null, onStateChangeEntering);
        }

        // On every navigation, make sure that the currNavItem is updated properly
        function onStateChangeEntering() {
            var urlAry = $location.url().split('/');
            var tailUrl = urlAry[urlAry.length - 1];
            vm.currNavItem = tailUrl;
        }

        function setActive(navItem) {
            // If the user re-selects the same nav item, scroll to top.
            if (navItem.code === vm.currNavItem) {
                scrollToTop();
            }

            vm.currNavItem = navItem.code;
        }

        function isActive(navItem) {
            return vm.currNavItem === navItem.code;
        }

        function scrollToTop() {
            $document.scrollTopAnimated(0, 1000);
        }
    }
})();
