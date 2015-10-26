// Shows a context menu that lets the user pick an action.
// Note that the context-menu.service injects a scope used by this directive and has full control over it. See the code there for all the goodness.
(function () {
    'use strict';
    angular
        .module('app.directives')
        .directive('rdcPopoverMessage', rdcPopoverMessage);

    function rdcPopoverMessage() {
        var directive = {
            restrict: 'E',
            scope: false,
            templateUrl: '/js/directives/controls/rdc-popover-message.html',
            replace: true
        };

        return directive;

    }
})();
