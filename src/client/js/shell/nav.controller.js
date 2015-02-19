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

    }
})();