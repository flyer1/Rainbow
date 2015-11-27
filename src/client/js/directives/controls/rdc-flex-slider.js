(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdcFlexSlider', rdcFlexSlider);

    rdcFlexSlider.$inject = ['$timeout'];

    function rdcFlexSlider($timeout) {
        var directive = {
            restrict: 'A',
            link: link,
            priority: 2
        };
        return directive;

        /////////////////// IMPLEMENTATION /////////////////////////
        function link(scope, element) {
            $timeout(function () {
                element.flexslider({
                    animation: 'slide',
                    animationLoop: true,
                    itemWidth: 150,
                    itemMargin: 0,
                    minItems: 2,
                    maxItems: 99
                });
            }, 0);
        }
    }
})();
