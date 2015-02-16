(function() {
    'use strict';

    angular
        .module('app.site')
        .controller('SiteController', SiteController);

    SiteController.$inject = ['datacontext'];

    function SiteController(datacontext) {
        var vm = this;
        var siteRepo = datacontext.getSiteRepository();
        vm.sites = siteRepo.sites;
        
        //console.log($urlParameters);
        
        return vm;
    }
})();