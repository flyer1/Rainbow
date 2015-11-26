// This file retrieves the data objects from the data folder and then adds on computed properties onto the object.
(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('siteRepository', siteRepository);

    siteRepository.$inject = ['siteData', 'schoolData', 'programData', 'messageData', 'imageData'];

    function siteRepository(siteData, schoolData, programData, messageData, imageData) {

        var siteRepository = null;

        var service = {
            getSiteRepository: getSiteRepository
        };

        return service;

        /************************* IMPLEMENTATION ******************************/

        // Return the entire data repository for the entire site. Because the data structure is so small (and future growth is not expected to ever change that to a big enough degree),
        // the entire block of data can be returned to the client in one data structure. It is then "caches" in a siteReposity variable for fast retrieval afterwards
        function getSiteRepository() {

            if (siteRepository !== null) {
                // If the site repo has already been generated, then return the stored value.
                return siteRepository;
            }

            // Get the site and school data
            var sites = siteData.getSites();
            var schools = schoolData.getSchools();
            var programs = programData.getPrograms();
            var messages = messageData.getMessages();
            var coverPhotos = imageData.getSitePhotos('P0');

            // Add the relationship "table" between sites and schools. Useful to generate counts of sites for a given schools for eg, or when filtering the sites via a set of schools.
            // Basically flatten the relationship between sites and the schools they service.
            var siteSchools = flattenSiteSchools(sites);
            var sitePrograms = flattenSitePrograms(sites);

            // Then add on computed properties for each site
            addSiteComputes(sites, schools, programs);

            // Then add on computed properties for each school
            addSchoolComputes(schools, siteSchools);
            // Then add on computed properties for each program
            addProgramComputes(programs, sitePrograms);

            siteRepository = {
                                sites: sites,
                                schools: schools,
                                programs: programs,
                                siteSchools: siteSchools,
                                sitePrograms: sitePrograms,
                                messages: messages,
                                coverPhotos: coverPhotos
                            };

            return siteRepository;
        }

        // Add some computed properties onto the site object
        function addSiteComputes(sites, schools, programs) {
            _.forEach(sites, function (site) {
                site.address.addressLine1 = (site.address.unitNumber ? site.address.unitNumber + '-' : '') + site.address.number + ' ' + site.address.street;
                site.address.addressLine2 = site.address.city + ', ' + site.address.province + ' ' + site.address.postalCode;
                site.photos = imageData.getSitePhotos(site.code);

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

        function addSchoolComputes(schools, siteSchools) {
            _.forEach(schools, function (school) {
                // For each school, add a count of how many sites service it
                school.siteCount = _.where(siteSchools, { 'schoolCode': school.code }).length;
                school.isChecked = false;
            });
        }

        function addProgramComputes(programs, sitePrograms) {
            _.forEach(programs, function (program) {
                // For each program, add a count of how many sites service it
                program.siteCount = _.where(sitePrograms, { 'programCode': program.code }).length;
                program.isChecked = false;
            });
        }

        function flattenSiteSchools(sites) {
            var siteSchools = [];

            _.forEach(sites, function (site) {
                _.forEach(site.schools, function (school) {
                    var newItem = {
                        siteCode: site.code,
                        schoolCode: school.code
                    };
                    siteSchools.push(newItem);
                });
            });

            return siteSchools;
        }

        function flattenSitePrograms(sites) {
            var sitePrograms = [];

            _.forEach(sites, function (site) {
                _.forEach(site.programs, function (program) {
                    var newItem = {
                        siteCode: site.code,
                        programCode: program.code
                    };
                    sitePrograms.push(newItem);
                });
            });

            return sitePrograms;
        }

        // Add all of the school properties onto the array of schools associated with a given site
        function addSiteSchoolComputes(siteSchools, schools) {
            _.forEach(siteSchools, function(siteSchool) {
                // Lookup the school associated with the site in the list of schools
                var foundSchool = _.findWhere(schools, { code: siteSchool.code });

                if (foundSchool) {
                    siteSchool.school = foundSchool;
                }
            });
        }

        // Add all of the program properties onto the array of programs associated with a given site
        function addSiteProgramComputes(sitePrograms, programs) {
            _.forEach(sitePrograms, function (siteProgram) {
                // Lookup the program associated with the site in the list of programs
                var foundProgram = _.findWhere(programs, { code: siteProgram.code });

                if (foundProgram) {
                    siteProgram.program = foundProgram;
                }
            });
        }
    }
})();
