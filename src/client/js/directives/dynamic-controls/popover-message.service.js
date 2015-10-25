// This service allows us to create a popover message directive on demand, where it exists in the DOM only when needed
(function () {
    'use strict';

    angular
        .module('app.directives')
        .factory('popoverMessageService', popoverMessageService);

    popoverMessageService.$inject = ['$rootScope', '$q', '$compile', '$document', '$timeout'];

    function popoverMessageService($rootScope, $q, $compile, $document, $timeout) {

        var service = {
            show: create,
        };

        return service;

        //////////////////////////// IMPLEMENTATION //////////////////////////////

        function create(options) {
            /* OPTIONS  (all required)
             * targetId          - The DOM element (a button) that launched the popover - used for positioning the popover
             * content           - What to show in the message
             */
            var scope = $rootScope.$new(true);
            var deferred = $q.defer();

            // Combine passed in options and local options to the scope which will be used by the directive
            angular.extend(scope, {
                content: null,
                element: null
            }, options);

            show();

            return deferred.promise;

            //////////////////////////////////////////////////////////

            // #region SHOWING/HIDING
            function show() {

                // Create the context menu directive and add it to the DOM
                scope.element = $compile('<rdc-popover-message content="content"></rdc-popover-message>')(scope);
                angular.element($document[0].body).append(scope.element);

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

            function close() {
                scope.element.modalPopover('hide');
            }

            // When the popover is hidden, remove it from the DOM and destroy the scope.
            function onHidePopover(e) {
                var element = scope.element;
                scope.$destroy();
                element.remove();
                element.off('hide.bs.modal', onHidePopover);
            }

            // #endregion

        }
    }
})();
