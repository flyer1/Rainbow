(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('SiteDetailsController', SiteDetailsController);

    SiteDetailsController.$inject = ['$document', '$stateParams', 'siteData'];

    function SiteDetailsController($document, $stateParams, siteData) {
        var vm = this;
        vm.site = {};
        vm.prevSite = {};
        vm.nextSite = {};
        vm.mapWidth = 0;
        var code = $stateParams.id;

        init(siteData);

        return vm;

        /******************** IMPLEMENTATION **********************/

        function init(siteData) {
            var foundSite = _.findWhere(siteData.sites, { 'code': code });
            vm.site = foundSite;

            console.log(vm.site);
            initSiteNav();

            $document.scrollTo(top);
        }

        // Init the data that drives the prev/next buttons 
        function initSiteNav() {
            var index = _.indexOf(siteData.sites, vm.site);
            var lastIndex = siteData.sites.length - 1;
            var prevIndex = (index === 0) ? lastIndex : index - 1;
            var nextIndex = (index === lastIndex) ? 0 : index + 1;

            vm.prevSite = siteData.sites[prevIndex];
            vm.nextSite = siteData.sites[nextIndex];
        }
       
    }
})();
