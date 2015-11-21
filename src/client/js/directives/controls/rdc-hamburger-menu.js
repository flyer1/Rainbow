(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdcHamburgerMenu', rdcHamburgerMenu);

    rdcHamburgerMenu.$inject = ['common'];

    function rdcHamburgerMenu(common) {
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

            var navElement = angular.element(common.helpers.getBody().find('.navbar')[0]);
            var siteOverlay = angular.element(angular.element('.site-overlay')[0]);
            
            scope.onClick = function () {
                toggleMenu();
            };

            siteOverlay.on('click', function() {
                toggleMenu();
            });

            function toggleMenu() {
                element.toggleClass('active');
                navElement.toggleClass('mobile-menu-open');
                siteOverlay.toggleClass('is-open');
            }
        }

    }
})();
