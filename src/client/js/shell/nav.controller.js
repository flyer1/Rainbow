(function () {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['datacontext'];

    function NavController(datacontext) {
        var vm = this;

        var siteRepo = datacontext.getSiteRepository();
        vm.sites = siteRepo.sites;
        vm.currNavItem = 'home';
        vm.setActive = setActive;
        vm.isActive = isActive;

        return;

        /////////// IMPLEMENTATION /////////////////
        function setActive(navItem) {
          vm.currNavItem = navItem.code;
          console.log('active nav is ' + vm.currNavItem );
        }

        function isActive(navItem) {
          return vm.currNavItem === navItem.code;
        }
    }
})();
