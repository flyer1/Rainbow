(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        var routes = getRoutes();

        routes.forEach(function (route) {
            $stateProvider.state(route.stateName, route.config);
        });

        $urlRouterProvider.otherwise("/");
    }

    function getRoutes() {
        return [
            {
                stateName: 'home',
                config : {
                    url: '/',
                    templateUrl: 'js/home/home.html',
                    controller: 'HomeController as vm'
                }
            },
            {
                stateName: 'site',
                config: {
                    url: '/site/:id',
                    templateUrl: 'js/site/site.html',
                    controller: 'SiteController as vm',

                }
            }
        ];

    }
})();

