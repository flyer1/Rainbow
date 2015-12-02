(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('SiteDetailsController', SiteDetailsController);

    SiteDetailsController.$inject = ['$document', '$window', '$stateParams', 'siteService', 'siteData'];

    function SiteDetailsController($document, $window, $stateParams, siteService, siteData) {
        var vm = this;
        vm.site = {};
        vm.photos = [];
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
            initJon();

            vm.photos = siteService.getSitePhotos(vm.site, vm.site.photos);

            $document.scrollTo(top);
        }

        function initJon() {
            var header = $('.site-banner');
            var headerHeight = header.height();
            var title = header.find('.section .container h1');
            var y = title.position().top;
            var titleHeight = title.height();

            function stickyScroll(e) {

                console.log($window.pageYOffset);
                if ($window.pageYOffset > y) {
                    header.addClass('fixed');
                }

                if ($window.pageYOffset > 270) {
                    header.addClass('fixed-2');
                }

                if ($window.pageYOffset < y ) {
                    header.removeClass('fixed');
                }
                if ($window.pageYOffset < 270) {
                    header.removeClass('fixed-2');
                }

            }

            // Scroll handler to toggle classes.
            angular.element($window).bind('scroll', stickyScroll);
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
