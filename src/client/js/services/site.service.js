(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('siteService', siteService);

    function siteService() {

        var service = {
            getSitePhotos: getSitePhotos
        };

        return service;

        /************************* IMPLEMENTATION ******************************/

        function getSitePhotos(site, photos) {
            var result = _.map(photos, function (photo) {
                var title = site ? site.name + ' - ' + site.address.friendlyLocation : '';
                return {
                    path: photo,
                    title: title,
                    titleTemplate: site ? '<h4><a href="/#/shell/site/P2">' + title + '</a></h4>' : ''
                };
            });

            return result;
        }
    }
})();
