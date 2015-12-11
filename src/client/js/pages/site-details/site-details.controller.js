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
            initBanner();

            vm.photos = siteService.getSitePhotos(vm.site, vm.site.photos);

            $document.scrollTo(top);
        }

        function initBanner() {
            var lastAction = '';
            var fixedBanner = angular.element('.site-banner-fixed');
            angular.element($window).bind('scroll', _.throttle(onScroll, 100));

            function onScroll() {
                var triggerY = 350;
                var action = '';

                if ($window.innerWidth < 767) return;

                action = $window.pageYOffset > triggerY ? 'addClass' : 'removeClass';

                if (action !== lastAction) {
                    lastAction = action;
                    console.log('performing action', action)
                    fixedBanner[action]('active');
                }
            }
        }

        // TODO: fix up this mess...
        // Also when do you turn off the event listener? 
        function initJon() {
            var header = $('.site-banner');
            var headerHeight = header.height();
            var title = header.find('.section .container h1');
            var y = title.position().top;
            var titleHeight = title.height();
            var lastAction = '';
            var action = '';

            function stickyScroll(e) {
                var className = '';

                if ($window.innerWidth < 767) return;

                if ($window.pageYOffset > y) {
                    action = 'addClass';
                    className = 'fixed';
                }

                if ($window.pageYOffset < y) {
                    action = 'removeClass';
                    className = 'fixed';

                }

                if ($window.pageYOffset > 270) {
                    header.addClass('fixed-2');
                }

                if ($window.pageYOffset < 270) {
                    header.removeClass('fixed-2');
                }

                if (action !== lastAction) {
                    console.log('performing action')
                    header[action](className);
                    lastAction = action;
                }

            }

            // Scroll handler to toggle classes.
            console.log('binding to scroll...') // TODO: Yeah, gotta unblind this sucka as I'm hooking up additional listeners with each nav to site details..
            angular.element($window).bind('scroll', _.throttle(stickyScroll, 50));
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
