(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        version: '1.1.0'
    };

    core.constant('config', config);

    core.config(configure);

    configure.$inject = [
        '$logProvider', '$routeProvider',
        'exceptionConfigProvider', 'routehelperConfigProvider', 'toastr'
    ];

    /* @ngInject */
    function configure(
        $logProvider, $routeProvider,
        exceptionConfigProvider, routehelperConfigProvider, toastr) {

        configureToastr();
        configureLogging();
        configureExceptions();
        configureRouting();

        function configureToastr() {
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = 'toast-bottom-right';
        }

        function configureLogging() {
            // turn debugging off/on (no info or warn)
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }

        function configureExceptions() {
            exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;
        }

        function configureRouting() {
            var routeCfg = routehelperConfigProvider;
            routeCfg.config.$routeProvider = $routeProvider;
            routeCfg.config.docTitle = 'CC: ';
            routeCfg.config.resolveAlways = { /* @ngInject */
                ready: function(datacontext) {
                    return datacontext.ready();
                }
//                ready: ['datacontext', function (datacontext) {
//                    return datacontext.ready();
//                }]
            };
        }
    }
})();