// Shows a context menu that lets the user pick an action.
// Note that the context-menu.service injects a scope used by this directive and has full control over it. See the code there for all the goodness.
(function () {
    'use strict';
    angular
        .module('app.directives')
        .directive('cmsContextMenu', cmsContextMenu);

    function cmsContextMenu() {
        var directive = {
            restrict: 'E',
            scope: false,
            templateUrl: '/app-ng/js/directives/controls/cms-context-menu.html',
            replace: true
        };

        return directive;

    }
})();
