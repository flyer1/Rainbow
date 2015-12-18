(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('performanceMonitorService', performanceMonitorService);

    performanceMonitorService.$inject = ['$interval', 'config'];

    function performanceMonitorService($interval, config) {

        var performanceData = {
            watchCount: -1
        };

        var service = {
            getPerformanceData: getPerformanceData
        };

        init();

        return service;

        /************************************** IMPLEMENTATION **************************************/

        function init() {
            if (config.debug) {
                $interval(setPerformanceMetrics, 5000);
            }
        }

        function getPerformanceData() {
            return performanceData;
        }

        function setPerformanceMetrics() {
            performanceData.watchCount = getWatchCount();
        }

        function getWatchCount() {
            var root = angular.element(document.getElementsByTagName('body'));

            var watchers = [];

            var countWatchers = function (element) {
                angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
                    if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                        angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                            watchers.push(watcher);
                        });
                    }
                });

                angular.forEach(element.children(), function (childElement) {
                    countWatchers(angular.element(childElement));
                });
            };

            countWatchers(root);

            // Remove duplicate watchers
            var watchersWithoutDuplicates = [];
            angular.forEach(watchers, function (item) {
                if (watchersWithoutDuplicates.indexOf(item) < 0) {
                    watchersWithoutDuplicates.push(item);
                }
            });

            return watchersWithoutDuplicates.length;
        }

    }

})();
