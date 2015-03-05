// This file retrieves the data objects from the data folder and then adds on computed properties onto the object. 
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('datacontext', datacontext);

    datacontext.$inject = ['siteData', 'schoolData'];

    function datacontext(siteData, schoolData) {

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

            // Add the relationship "table" between sites and schools. Useful to generate counts of sites for a given schools for eg, or when filtering the sites via a set of schools.
            // Basically flatten the relationship between sites and the schools they service.
            var siteSchools = getSiteSchools(sites);

            // Then add on computed properties for each site
            addSiteComputes(sites, schools);

            // Then add on computed properties for each school
            addSchoolComputes(schools, siteSchools);

            siteRepository = {
                                sites: sites,
                                schools: schools,
                                siteSchools: siteSchools
                            };
            
            return siteRepository;
        }

        // Add some computed properties onto the site object
        function addSiteComputes(sites, schools) {
            _.forEach(sites, function (site) {
                site.address.addressLine1 = (site.address.unitNumber ? site.address.unitNumber + '-' : '') + site.address.number + ' ' + site.address.street;
                site.address.addressLine2 = site.address.city + ', ' + site.address.province + ' ' + site.address.postalCode;
                
                // Google maps API for a static map with marker
                var baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
                var address = site.address.number + '+' + site.address.street + ',' + site.address.city + ',' + site.address.province + ',' + site.address.postalCode;
                var marker = '&markers=color:blue%7Clabel:' + site.shortName + '%7C' + site.address.lat + ' ,' + site.address.lng;
                var args = '?center=' + address + '&zoom=14&size=450x350&maptype=roadmap' + marker;

                site.address.staticMapSrc = baseUrl + args;
                //site.address.staticMapSrc = './img/staticmap.png'; // Used when working offline.
                
                addSiteSchoolComputes(site.schools, schools);
            });
        }
        
        function addSchoolComputes(schools, siteSchools) {
            _.forEach(schools, function (school) {
                // For each school, add a count of how many sites service it
                school.siteCount = _.where(siteSchools, { 'schoolCode': school.code }).length;
                school.isChecked = false;
            });
        }

        function getSiteSchools(sites) {
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

        function addSchool(newSite, school, transportType) {
            var newSchool = $.extend({}, school, {
                transportType: transportType
            });
            newSite.schools.push(newSchool);
        };
        
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
    }
})();
