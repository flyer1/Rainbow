(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('SiteDetailsController', SiteDetailsController);

    SiteDetailsController.$inject = ['$document', '$window', 'datacontext', '$sce', '$stateParams'];

    function SiteDetailsController($document, $window, datacontext, $sce, $stateParams) {
        var vm = this;
        var siteRepo = datacontext.getSiteRepository();
        vm.site = {};
        vm.mapWidth=0;
        var code = $stateParams.id;

        init(siteRepo.sites, code);

        return vm;

        /******************** IMPLEMENTATION **********************/

        function init(sites, siteCode) {
            var foundSite = _.findWhere(sites, { 'code': code });

            if (foundSite) {
                vm.site = foundSite;
                vm.mapSrc = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + vm.site.address.addressLine1 + ',' + vm.site.address.addressLine2 + '&key=AIzaSyAXuaY3jzo_vEw-DwyBxmOi6orRLl7m2eI');
                console.log(vm.site);
            }

            vm.mapWidth = ($window.innerWidth / 2) - 50;
        }

    }
})();
