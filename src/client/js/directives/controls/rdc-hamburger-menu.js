(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdcHamburgerMenu', rdcHamburgerMenu);

    function rdcHamburgerMenu() {
        var directive = {
            scope: {
            },
            templateUrl: '/js/directives/controls/rdc-hamburger-menu.html',
            restrict: 'E',
            link: link,
            replace: true
        };
        return directive;

        ///////////////////////

        function link(scope, element) {

            scope.onClick = function () {
                element.toggleClass('active');
            };
        }

    }
})();
