(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdcMap', rdcMap);

    rdcMap.$inject = ['$window', '$sce', 'config'];

    function rdcMap($window, $sce, config) {
        var directive = {
            scope: {
                'site': '='
            },
            templateUrl: '/js/directives/controls/rdc-map.html',
            restrict: 'E',
            link: link
        };
        return directive;

        /////////////////// IMPLEMENTATION /////////////////////////
        function link(scope) {
            scope.onResize = onResize;

            scope.mapSrc = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + scope.site.address.addressLine1 + ',' + scope.site.address.addressLine2 + '&key=' + config.googleApiKey);
            scope.mapWidth = getMapWidth();

            angular.element($window).on('resize', scope.onResize);
            scope.$on('$destroy', onDestroy);

            return;
            ///////////

            function onResize() {
                scope.mapWidth = getMapWidth();
                scope.$apply();
            }

            // B/c the iframe needs a pre-defined width set (for google maps to know how many tiles to return back to us), use media style css approach here to figure out the widths
            function getMapWidth() {
                var mapWidth = 0;
                var containerWidth = 0;
                var windowWidth = $window.innerWidth;

                if (windowWidth > 1200) {
                    containerWidth = 1170;
                    mapWidth = (containerWidth * (8 /12)) - 50;
                } else if (windowWidth > 992) {
                    containerWidth = 970;
                    mapWidth = (containerWidth * (7 / 12)) - 50;
                } else if (windowWidth > 768) {
                    containerWidth = 750;
                    mapWidth = containerWidth - 50;
                } else {
                    containerWidth = windowWidth;
                    mapWidth = containerWidth - 65;
                }
                return mapWidth;
            }

            function onDestroy() {
                console.log('destroying resize listener');
                angular.element($window).off('resize', onResize);
            }

        }

    }
})();
