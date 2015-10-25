(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdnBannerMessage', rdnBannerMessage);

        rdnBannerMessage.$inject = ['popoverMessageService'];

    function rdnBannerMessage(popoverMessageService) {
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
            scope.showDetails = showDetails;

            return;
            ///////////

            function showDetails() {
                var options = {
                        targetId: 'banner-message-toggle',
                        content: scope.message.full
                };
                popoverMessageService.show(options);
            }
        }
    }
})();
