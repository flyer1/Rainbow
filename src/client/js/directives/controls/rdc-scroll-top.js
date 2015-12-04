(function () {
    'use strict';
    angular
        .module('app.directives')
        .directive('rdcScrollTop', rdcScrollTop);

    rdcScrollTop.$inject = ['$window', '$document'];

    function rdcScrollTop($window, $document) {
        var directive = {
            restrict: 'E',
            scope: false,
            templateUrl: '/js/directives/controls/rdc-scroll-top.html',
            link: link
        };

        return directive;
        ///////////////// IMPLEMENTATION //////////////
        function link(scope) {
            scope.scrollToTop = scrollToTop;

            init();
        }

        function init() {
            // Scroll handler to toggle classes.
            angular.element($window).bind('scroll', _.debounce(onScroll, 50));
        }

        // TODO: directive-ize this!
        function onScroll(e) {
            if ($window.pageYOffset > $window.screen.availHeight / 2) {
                $('footer').addClass('has-to-top'); 
            } else {
                $('footer').removeClass('has-to-top');
            }
        }

        function scrollToTop() {
            $document.scrollTopAnimated(0, 1000);
        }
    }
})();
