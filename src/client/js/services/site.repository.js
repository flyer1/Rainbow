// This file retrieves the data objects from the data folder and then adds on computed properties onto the object.
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('siteRepository', siteRepository);

    siteRepository.$inject = ['$q', 'webDataService'];

    function siteRepository($q, webDataService) {

        var siteRepository = null;
        var sites = null;
        var schools = null;
        var programs = null;
        var refTransport = null;
        var messages = null;
        var coverPhotos = null;

        var service = {
            getSiteRepository: getSiteRepository
        };

        return service;

        /************************* IMPLEMENTATION ******************************/

        // Return the entire data repository for the entire site. Because the data structure is so small (and future growth is not expected to ever change that to a big enough degree),
        // the entire block of data can be returned to the client in one data structure. It is then "caches" in a siteReposity variable for fast retrieval afterwards
        function getSiteRepository() {
            var deferred = $q.defer();

            // Get the site and school data
            if (siteRepository !== null) {
                // If the site repo has already been generated, then return the stored value.
                console.log('Resolving site repo from cache');
                deferred.resolve(siteRepository);
            } else {
                console.log('Building up new site repo');
                var promises = [
                    webDataService.getSites().then(function (data) {
                        sites = data;
                    }),
                    webDataService.getSchools().then(function (data) {
                        schools = data;
                    }),
                    webDataService.getPrograms().then(function (data) {
                        programs = data;
                    }),
                    webDataService.getMessages().then(function (data) {
                        messages = data;
                    }),
                     webDataService.getRefTransport().then(function (data) {
                         refTransport = data;
                     }),
                    webDataService.getCoverPhotos().then(function (data) {
                        coverPhotos = data;
                    })
                ];

                $q.all(promises).finally(function () {
                    siteRepository = postProcessSiteRepo();
                    deferred.resolve(siteRepository);
                });
            }

            return deferred.promise;
        }

        function postProcessSiteRepo() {
            // Then add on computed properties for each site
            addSiteComputes(sites, schools, programs);

            // Then add on computed properties for each school
            addSchoolComputes(schools);

            // Then add on computed properties for each program
            addProgramComputes(programs);

            var repo = {
                sites: sites,
                schools: schools,
                programs: programs,
                messages: messages,
                coverPhotos: coverPhotos
            };

            return repo;
        }

        // Add some computed properties onto the site object
        function addSiteComputes(sites, schools, programs) {
            _.forEach(sites, function (site) {
                site.address.addressLine1 = (site.address.unitNumber ? site.address.unitNumber + '-' : '') + site.address.number + ' ' + site.address.street;
                site.address.addressLine2 = site.address.city + ', ' + site.address.province + ' ' + site.address.postalCode;

                // Google maps API for a static map with marker
                var baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
                var address = site.address.number + '+' + site.address.street + ',' + site.address.city + ',' + site.address.province + ',' + site.address.postalCode;
                var marker = '&markers=color:blue%7Clabel:' + site.shortName + '%7C' + site.address.lat + ' ,' + site.address.lng;
                var args = '?center=' + address + '&zoom=16&size=450x350&maptype=roadmap' + marker;

                site.address.staticMapSrc = baseUrl + args;

                site.isExpanded = true;

                addSiteSchoolComputes(site.schools, schools);
                addSiteProgramComputes(site.programs, programs);
            });
        }

        function addSchoolComputes(schools) {
            _.forEach(schools, function (school) {
                // For each school, add a count of how many sites service it
                school.siteCount = _.filter(sites, function (site) {
                    return _.findWhere(site.schools, { code: school.code });
                }).length;
                school.isChecked = false;
            });
        }

        function addProgramComputes(programs) {
            _.forEach(programs, function (program) {
                // For each program, add a count of how many sites service it
                program.siteCount = _.filter(sites, function (site) {
                    return _.findWhere(site.programs, { code: program.code });
                }).length;
                program.isChecked = false;
            });
        }

        // Add all of the school properties onto the array of schools associated with a given site
        function addSiteSchoolComputes(siteSchools, schools) {
            _.forEach(siteSchools, function (siteSchool) {
                // Lookup the school associated with the site in the list of schools
                var foundSchool = _.findWhere(schools, { code: siteSchool.code });

                if (foundSchool) {
                    _.merge(siteSchool, foundSchool);
                }

                var foundTransport = _.findWhere(refTransport, { code: siteSchool.transportType });
                if (foundTransport) {
                    siteSchool.transport = foundTransport;
                }
            });
        }

        // Add all of the program properties onto the array of programs associated with a given site
        function addSiteProgramComputes(sitePrograms, programs) {
            _.forEach(sitePrograms, function (siteProgram) {
                // Lookup the program associated with the site in the list of programs
                var foundProgram = _.findWhere(programs, { code: siteProgram.code });

                if (foundProgram) {
                    _.merge(siteProgram, foundProgram);
                }
            });
        }
    }
})();
