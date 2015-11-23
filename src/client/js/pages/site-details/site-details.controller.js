(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('SiteDetailsController', SiteDetailsController);

    SiteDetailsController.$inject = ['$document', '$stateParams', 'siteRepository'];

    function SiteDetailsController($document, $stateParams, siteRepository) {
        var vm = this;
        var siteRepo = siteRepository.getSiteRepository();
        vm.site = {};
        vm.prevSite = {};
        vm.nextSite = {};
        vm.mapWidth = 0;
        var code = $stateParams.id;

        init();

        return vm;

        /******************** IMPLEMENTATION **********************/

        function init() {
            var foundSite = _.findWhere(siteRepo.sites, { 'code': code });
            vm.site = foundSite;

            console.log(vm.site);
            initSiteNav();

            $document.scrollTo(top);
        }

        // Init the data that drives the prev/next buttons 
        function initSiteNav() {
            var index = _.indexOf(siteRepo.sites, vm.site);
            var lastIndex = siteRepo.sites.length - 1;
            var prevIndex = (index === 0) ? lastIndex : index - 1;
            var nextIndex = (index === lastIndex) ? 0 : index + 1;

            vm.prevSite = siteRepo.sites[prevIndex];
            vm.nextSite = siteRepo.sites[nextIndex];
        }
       
    }
})();
