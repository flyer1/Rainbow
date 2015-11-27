(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdcLightGallery', rdcLightGallery);

    rdcLightGallery.$inject = ['$timeout'];

    function rdcLightGallery($timeout) {
        var directive = {
            restrict: 'A',
            link: link,
            priority: 1
        };
        return directive;

        /////////////////// IMPLEMENTATION /////////////////////////
        function link(scope, element) {
            $timeout(function() {
                element.lightGallery();
            }, 0);
        }
    }
})();
