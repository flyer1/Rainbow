(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdnBannerMessage', rdnBannerMessage);

    function rdnBannerMessage() {
        var directive = {
            link: link,
            scope: {
                    'message': '=',
            },
            templateUrl: '/js/directives/controls/rdc-banner-message.html',
            restrict: 'E'
        };
        return directive;

        /////////////////// IMPLEMENTATION ///////////////////
        function link(scope, element, attrs) {
            scope.showFullMessage = showFullMessage;

            return;
            ///////////

            function showFullMessage() {
                var options = {
                        placement: 'bottom',
                        content: 'hey mother fucker!'
                };
                element.popover(options);
            }
        }
    }
})();
