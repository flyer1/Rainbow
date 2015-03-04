// This route file maps a given URL to a page on the site. This routing is done on the client side so the transitions are smoother than traditional webistes 
// where everything blanks out for a split second and then gets everything again from the server. With client side routing, only the piece that you need from
// the server is fetched (unless it's already cached by Angular).
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
                // TODO: I think I need to add an abstract state for the shell in here.
                stateName: 'home',
                config : {
                    url: '/',
                    views: {
                        "main": {
                            templateUrl: 'js/home/home.html',
                            controller: 'HomeController as vm'
                        },
                    }
                }
            },
            {
                stateName: 'site',
                config: {
                    url: '/sites/:code',
                    views: {
                        "main": {
                            templateUrl: 'js/site/site.html',
                            controller: 'SiteController as vm',
                        }
                    }

                }
            }
        ];

    }
})();

