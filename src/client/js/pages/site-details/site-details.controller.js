(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('SiteDetailsController', SiteDetailsController);

    SiteDetailsController.$inject = ['$document', '$window', '$sce', '$stateParams', 'datacontext'];

    function SiteDetailsController($document, $window, $sce, $stateParams, datacontext) {
        var vm = this;
        var siteRepo = datacontext.getSiteRepository();
        vm.site = {};
        vm.prevSite = {};
        vm.nextSite = {};
        vm.mapWidth = 0;
        var code = $stateParams.id;

        init();

        return vm;

        /******************** IMPLEMENTATION **********************/

        function init() {

            $document.scrollTo(top);

            var foundSite = _.findWhere(siteRepo.sites, { 'code': code });
            var index = _.indexOf(siteRepo.sites, foundSite);

            vm.site = foundSite;
            vm.mapSrc = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + vm.site.address.addressLine1 + ',' + vm.site.address.addressLine2 + '&key=AIzaSyAXuaY3jzo_vEw-DwyBxmOi6orRLl7m2eI');
            console.log(vm.site);

            var lastIndex = siteRepo.sites.length - 1;
            var prevIndex = (index === 0) ? lastIndex: index - 1;
            var nextIndex = (index === lastIndex) ? 0 : index + 1;

            vm.prevSite = siteRepo.sites[prevIndex];
            vm.nextSite = siteRepo.sites[nextIndex];

            vm.mapWidth = ($window.innerWidth / 2) - 50;

        }

       
    }
})();
