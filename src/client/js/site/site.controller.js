(function() {
    'use strict';

    angular
        .module('app.site')
        .controller('SiteController', SiteController);

    SiteController.$inject = ['datacontext', '$stateParams'];

    function SiteController(datacontext, $stateParams) {
        var vm = this;
        var siteRepo = datacontext.getSiteRepository();
        vm.site = {};
        var code = $stateParams.id;

        init(siteRepo.sites, code);

        return vm;

        /******************** IMPLEMENTATION **********************/

        function init(sites, siteCode) {
            var foundSite = _.findWhere(sites, { 'code': code });

            if (foundSite) {
                vm.site = foundSite;
                console.log(vm.site);
            }

        }

    }
})();
