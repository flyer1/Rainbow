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

        $urlRouterProvider.otherwise('/shell/home?ver=1');

        routes.forEach(function (route) {
            $stateProvider.state(route.stateName, route.config);
        });

    }

    function getRoutes() {
        return [
          {
                // setup an abstract state
                stateName: 'shell',
                config: {
                    url: '/shell',
                    abstract: true,
                    views: {
                        'shell': {
                            templateUrl: '/js/pages/shell/shell.html',
                            controller: 'ShellController as vm'
                        }
                    },
                    // This resolve will run before any page loads (b/c it's part of this abstract state that has to run for every page) and then siteData can be injected into any controller
                    resolve: {
                        siteData: function(siteRepository) { return siteRepository.getSiteRepository(); }
                    }
                }
            },
            {
               stateName: 'shell.home',
               config: {
                   url: '/home',
                   views: {
                       'main': {
                           templateUrl: '/js/pages/home/home.html',
                           controller: 'HomeController as vm'
                       }
                   }
               }
           },
           {
              stateName: 'shell.site',
              config: {
                  url: '/site/:id',
                  views: {
                      'main': {
                          templateUrl: '/js/pages/site-details/site-details.html',
                          controller: 'SiteDetailsController as vm'
                      }
                  }
              }
          },
        ];

    }
})();
