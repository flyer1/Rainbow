(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdcHamburgerMenu', rdcHamburgerMenu);

    rdcHamburgerMenu.$inject = ['common', 'router'];

    function rdcHamburgerMenu(common, router) {
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

            var isOpen = false;
            var navElement = angular.element(common.helpers.getBody().find('.navbar')[0]);
            var siteOverlay = angular.element(angular.element('.site-overlay')[0]);

            init();

            return;

            ///////////////////////////////

            function init() {
                scope.onClick = function () {
                    toggleMenu();
                };

                siteOverlay.on('click', function () {
                    toggleMenu();
                });

                router.registerStateChangedListener(onRouteChanged);
                
            }

            function toggleMenu() {
                isOpen = !isOpen;
                element.toggleClass('active');
                navElement.toggleClass('mobile-menu-open');
                siteOverlay.toggleClass('is-open');
            }

            function onRouteChanged() {
                if (isOpen) {
                    // If the menu is open and a state change occurs, then close the hamburger menu
                    toggleMenu();
                }
            }


        }

    }
})();
