(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$location', '$document', 'datacontext'];

    function ShellController($location, $document, datacontext) {
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
            var urlAry = $location.url().split('/');
            var tailUrl = urlAry[urlAry.length - 1];
            vm.currNavItem = tailUrl;
        }

        function setActive(navItem) {
            vm.currNavItem = navItem.code;
        }

        function isActive(navItem) {
            return vm.currNavItem === navItem.code;
        }

        function scrollToTop() {
            $document.scrollTopAnimated(0, 5000);
        }
    }
})();
