(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$location', 'datacontext'];

    function ShellController($location, datacontext) {
        var vm = this;

        var siteRepo = datacontext.getSiteRepository();
        vm.sites = siteRepo.sites;
        vm.currNavItem = '';
        vm.setActive = setActive;
        vm.isActive = isActive;

        init();
        return;

        /////////// IMPLEMENTATION /////////////////
        function init() {
            var urlAry = $location.url().split('/');
            var tailUrl = urlAry[urlAry.length - 1];
            vm.currNavItem = tailUrl;
        }

        function setActive(navItem) {
          vm.currNavItem = navItem.code;
          console.log('active nav is ' + vm.currNavItem );
        }

        function isActive(navItem) {
          return vm.currNavItem === navItem.code;
        }
    }
})();
