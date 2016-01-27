(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$location', '$document', 'router', 'siteData', 'performanceMonitorService'];

    function ShellController($location, $document, router, siteData, performanceMonitorService) {
        var vm = this;

        // Properties
        vm.sites = [];
        vm.lastUpdateDate = '';
        vm.currNavItem = '';
        vm.performanceData = {};

        // Functions
        vm.setActive = setActive;
        vm.isActive = isActive;
        vm.scrollToTop = scrollToTop;

        init(siteData);

        return;

        /////////// IMPLEMENTATION /////////////////
        function init(siteData) {
            vm.sites = siteData.sites;
            vm.lastUpdateDate = getLastUpdated(siteData.changeLog);

            // Default the current nav item based upon the URL
            router.registerStateChangedListener(onRouteChanged);
            setActive(getCurrentCode());
            vm.performanceData = performanceMonitorService.getPerformanceData();
        }

        function getLastUpdated(changeLog) {
            var result = '';
            // The data is assumed to have the most recent entry at the top.
            if (changeLog && changeLog.length > 0) {
                result = changeLog[0].date; // Date stored as string
            }

            return result;
        }
        // On every navigation, make sure that the currNavItem is updated properly
        function onRouteChanged(event, toState, toParams, fromState, fromParams) {
            setActive(getCurrentCode());
        }

        function setActive(code) {
            // If the user re-selects the same nav item, scroll to top.
            if (code === vm.currNavItem) {
                scrollToTop();
            }

            vm.currNavItem = code;
        }

        function isActive(code) {
            return vm.currNavItem === code;
        }

        function getCurrentCode() {
            var urlAry = $location.url().split('/');
            var code = urlAry[urlAry.length - 1];
            return code;
        }

        function scrollToTop() {
            $document.scrollTopAnimated(0, 1000);
        }

    }
})();
