(function () {
    'use strict';

    angular
        .module('app')
        .run(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {

        var routes = getRoutes();

        routes.forEach(function (route) {
            $stateProvider.when(route.name,route.config);
        });  
    }

    function getRoutes() {
        var contacts = { 
            name: 'contacts',
            templateUrl: 'contacts.html',
            data: {
                customData1: 5,
                customData2: "blue"
            }  
        }
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

