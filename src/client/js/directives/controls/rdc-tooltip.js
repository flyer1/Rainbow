(function () {
    'use strict';
    angular
        .module('app.directives')
        .directive('rdcTooltip', rdcTooltip);

    rdcTooltip.$inject = ['$timeout'];

    function rdcTooltip($timeout) {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        /////////////////// IMPLEMENTATION /////////////
        function link(scope, element, attrs) {

            var options = {
                placement: 'top',
                trigger: 'hover',
                container: 'body' // This helps in the positioning of tooltips over top of other elements.
            };
            options.placement = attrs.placement || options.placement;
            options.title = attrs.rdcTooltip;
            var $element = $(element);
            $element.tooltip(options);

            //tossing in an auto-hide feature to close the tooltip after 2 secs;  this is to get around the problem of "sticky" tooltips that sometimes don't properly hide after leaving hover
            var timeoutPromise = null;
            $element.on('shown.bs.tooltip', function () {
                timeoutPromise = $timeout(function () {
                    $element.tooltip('hide');
                }, 2000);
            });

            // need to cancel our timeout on hide, in case the user enters / leaves / re-enters the element - if we don't the tooltip may be hidden pre-maturely.
            $element.on('hide.bs.tooltip', function () {
                if (timeoutPromise) $timeout.cancel(timeoutPromise);
            });

        }
    }
})();

