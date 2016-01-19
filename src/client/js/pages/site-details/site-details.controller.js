(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('SiteDetailsController', SiteDetailsController);

    SiteDetailsController.$inject = ['$document', '$window', '$stateParams', 'siteService', 'siteData'];

    function SiteDetailsController($document, $window, $stateParams, siteService, siteData) {
        var vm = this;

        // Properties
        vm.site = {};
        vm.photos = [];
        vm.prevSite = {};
        vm.nextSite = {};
        vm.mapWidth = 0;

        // Functions
        vm.toTop = toTop;
        vm.getTransportMethod = getTransportMethod;

        var code = $stateParams.id;

        init(siteData);

        return vm;

        /******************** IMPLEMENTATION **********************/

        function init(siteData) {
            var foundSite = _.findWhere(siteData.sites, { 'code': code });
            vm.site = foundSite;

            console.log(vm.site);
            initSiteNav();
            initBanner();

            vm.photos = siteService.getSitePhotos(vm.site, vm.site.photos);

            toTop();
        }

        function initBanner() {
            var lastAction = '';
            var fixedBanner = angular.element('.site-banner-fixed');
            angular.element($window).bind('scroll', _.throttle(onScroll, 100)); // TODO: unbind on destroy of the controller

            function onScroll() {
                var triggerY = 350;
                var action = '';

                if ($window.innerWidth < 767) return;

                action = $window.pageYOffset > triggerY ? 'addClass' : 'removeClass';

                if (action !== lastAction) {
                    lastAction = action;
                    fixedBanner[action]('active');
                }
            }
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

        function toTop(animated) {

            if (animated) {
                $document.scrollTopAnimated(0, 1000);
            } else {
                $document.scrollTo(top);
            }
        }

        function getTransportMethod(transport) {
            var result = '';
            switch (transport.code) {
                case 'WK':
                    result = 'Children are walked to school';
                    break;
                default:
                    result = 'Transportation via ' + transport.name;
                    break;
            }

            return result;
        }

    }
})();
