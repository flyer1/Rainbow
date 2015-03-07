// This route file maps a given URL to a page on the site. This routing is done on the client side so the transitions are smoother than traditional webistes 
// where everything blanks out for a split second and then gets everything again from the server. With client side routing, only the piece that you need from
// the server is fetched (unless it's already cached by Angular on the client). The result is much smoother navigations. And who doesn't want that???
(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        var routes = getRoutes();

        $urlRouterProvider.otherwise("/home");

        routes.forEach(function (route) {
            $stateProvider.state(route.stateName, route.config);
        });

    }

    function getRoutes() {
        return [
            {
                stateName: 'home',
                config: {
                    url: '/home',
                    templateUrl: 'js/home/home.html',
                    controller: 'HomeController as vm'
                }
            },
            {
                stateName: 'site',
                config: {
                    url: '/sites/:code',
                    templateUrl: 'js/site/site.html',
                    controller: 'SiteController as vm',
                }
            }
        ];

    }
})();

