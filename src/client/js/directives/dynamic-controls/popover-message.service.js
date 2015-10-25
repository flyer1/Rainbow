// This service allows us to create a context menu directive on demand, where it exists in the DOM only when needed
(function () {
    'use strict';

    angular
        .module('app.directives')
        .factory('contextMenuService', contextMenuService);

    contextMenuService.$inject = ['$rootScope', '$compile', '$timeout', 'common'];

    function contextMenuService($rootScope, $compile, $timeout, common) {

        var service = {
            show: create,
        };

        return service;

        //////////////////////////// IMPLEMENTATION //////////////////////////////

        function create(options) {
            /* OPTIONS  (all required)
             * targetId          - The DOM element (a button) that launched the popover - used for positioning the popover
             * items             - Array of objects that describe the menu items to display to the user. structure: { name: 'foo', icon 'fa fa-foo', callback: fooFn }.
             */
            options.guardRequiredProperties(['targetId', 'items']);

            var scope = $rootScope.$new(true);
            var deferred = common.$q.defer();

            // Combine passed in options and local options to the scope which will be used by the directive
            angular.extend(scope, {
                closeItem:closeItem,
                selectItem: selectItem,
                items: null,
                element: null
            }, options);

            show();

            return deferred.promise;

            //////////////////////////////////////////////////////////

            // #region SHOWING/HIDING
            function show() {

                // Create the context menu directive and add it to the DOM
                scope.element = $compile('<cms-context-menu items="items"></cms-context-menu>')(scope);
                common.helpers.getBody().append(scope.element);

                // Allow the element to be added to the DOM before attempting to show the popover
                $timeout(function () {

                    // Turn the element into a modal popover using the 3rd party lib
                    scope.element.modalPopover({
                        target: "#" + scope.targetId,
                        placement: 'bottom',
                    });

                    // Finally show the sucker
                    scope.element.modalPopover('show');

                    scope.element.on('hide.bs.modal', onHidePopover);

                }, 300);

                return;
            }

            function closeItem() {
                close();
            }

            function selectItem(item) {
                deferred.resolve(item);
                deferred = null;
                close();
            }

            function close() {
                scope.element.modalPopover('hide');
            }

            // When the popover is hidden, remove it from the DOM and destroy the scope.
            function onHidePopover(e) {
                if (deferred) deferred.reject();
                var element = scope.element;
                scope.$destroy();
                element.remove();
                element.off('hide.bs.modal', onHidePopover);
            }

            // #endregion

        }
    }
})();
