(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        version: '0.9.0'
    };

    core.constant('config', config);

    core.config(configure);

    configure.$inject = [
        '$logProvider', '$routeProvider',
        'exceptionConfigProvider', 'routehelperConfigProvider', 'toastr'
    ];

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
            routeCfg.config.resolveAlways = { 
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
