(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('rdcBannerMessage', rdcBannerMessage);

    function rdcBannerMessage() {
        var directive = {
            scope: {
                'data': '=',
            },
            templateUrl: '/js/directives/controls/rdc-banner-message.html',
            restrict: 'E'
        };
        return directive;

    }
})();
