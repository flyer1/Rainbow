(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('siteService', siteService);

    function siteService() {

        var service = {
            getSitePhotos: getSitePhotos,
            getMatchedSites: getMatchedSites
        };

        return service;

        /************************* IMPLEMENTATION ******************************/

        function getSitePhotos(site, photos) {
            var result = _.map(photos, function (photo) {
                var title = site ? site.name + ' - ' + site.address.friendlyLocation : '';
                var template = _.template('<h4><a href="/#/shell/site/<%= siteCode %>"><%= title %></a></h4>');
                return {
                    path: photo,
                    title: title,
                    titleTemplate: site ? template({siteCode: site.code, title: title}) : ''
                };
            });

            return result;
        }

        // Find a list of site codes that match the array of school/program codes
        function getMatchedSites(sites, checkedSchoolCodes, checkedProgramCodes) {

            var intermediateMatches = [];
            var matches = [];

            _.each(checkedSchoolCodes, function (schoolCode) {
                var filterResults = _.filter(sites, function(site) {
                    return _.some(site.schools, { code: schoolCode });
                });

                intermediateMatches = intermediateMatches.concat(filterResults);
            });

            intermediateMatches = _.uniq(intermediateMatches);

            // Search again over the set of matched sites for matching Program codes
            _.each(checkedProgramCodes, function (programCode) {
                var filterResults = _.filter(intermediateMatches, function (site) {
                    return _.some(site.programs, { code: programCode });
                });

                matches = matches.concat(filterResults);
            });

            matches = _.uniq(_.pluck(matches, 'code'));
            return matches;
        }
    }
})();
