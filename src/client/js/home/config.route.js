(function () {
    'use strict';

    angular
        .module('app.home')
        .run(routeConfig);

    function routeConfig(routehelper) {
        var routes = getRoutes();

        routes.forEach(function (route) {
            //route.config.resolve =
            //    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
            $routeProvider.when(route.url, route.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'js/home/home.html',
                    title: 'Home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Home'
                    }
                }
            },
             {
                 url: '/site/:id',
                 config: {
                     templateUrl: 'js/site/site.html',
                     title: 'Site',
                     settings: {
                         nav: 1,
                         content: '<i class="fa fa-dashboard"></i> Site'
                     }
                 }
             }
        ];
    }
})();

