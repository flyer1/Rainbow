(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$window', '$scope', 'siteRepository'];

    function HomeController($window, $scope, siteRepository) {
        var vm = this;

        vm.sites = []; // Full list of sites (centres)
        vm.schools = []; // Full list of schools
        vm.programs = []; // Full list of schools
        vm.checkedSchools = []; // List of school codes that has been checked off by the user.
        vm.checkedPrograms = []; // List of program codes that has been checked off by the user.
        vm.siteCount = -1;
        vm.matchedSites = {}; // List of sites that match the given filter criteria set by the user

        vm.toggleFilter = toggleFilter;
        vm.hasSchoolFilter = hasSchoolFilter;
        vm.hasProgramFilter = hasProgramFilter;
        vm.isMatchedSite = isMatchedSite;
        vm.isCheckedSchool = isCheckedSchool;
        vm.isCheckedProgram = isCheckedProgram;

        init();

        return vm;

        /******************** IMPLEMENTATION **********************/
        function init() {
            var siteRepo = siteRepository.getSiteRepository();

            vm.sites = siteRepo.sites;
            vm.schools = siteRepo.schools;
            vm.programs = siteRepo.programs;
            vm.siteSchools = siteRepo.siteSchools;
            vm.messages = siteRepo.messages;

            setMatchedSites(); // Array of site codes that match the filter criteria set by the user
            console.log(siteRepo); // TODO: remove later
            $window.jon = vm;
        }

        function toggleFilter(item) {
            item.isChecked = !item.isChecked;
            // An option has been changed, re-calculate the find options
            setMatchedSites();
        }

        // Every time a find option changes, store the matched sites so they don't have to be recomputed for each site.
        function setMatchedSites() {
            var checkedSchools = [];
            var checkedPrograms = [];
            var matchedSites = [];

            // Grab the list of the checked schools
            checkedSchools = _.pluck(_.filter(vm.schools, { isChecked: true }), 'code');

            if (checkedSchools.length === 0) {
                // No schools checked. Return sites for all schools.
                checkedSchools = _.pluck(vm.schools, 'code');
            }

            _.forEach(checkedSchools, function(school) {
                var results = _.where(vm.siteSchools, {
                    'schoolCode': school
                });
                _.forEach(results, function(item) {
                    // Check that the site's code has not yet been added.
                    if (!_.contains(matchedSites, item.siteCode)) {
                        // The site has not yet been added to the results. Add it now.
                        matchedSites.push(item.siteCode);
                    }
                });

            });

            // The matched sites now contains an array of site codes that match the user's find options.
            vm.matchedSites = matchedSites;
            vm.checkedSchools = checkedSchools;

            // Also set the boolean on each site to indicate if it contains at least 1 match to the filter criteria. This helps on deciding if the site should be shown/hidden.
            _.forEach(vm.sites, function(site) {
              site.isChecked = isMatchedSite(site);
            });
            console.log(matchedSites);
            return;
        }

        // Returns true if the find options match a given site
        function isMatchedSite(site) {
            var result = (_.contains(vm.matchedSites, site.code));
            return result;
        }

        // Returns true if the passed in school is also in the list of checked schools
        function isCheckedSchool(school) {
            return _.contains(vm.checkedSchools, school.code);
        }

        // Returns true if the passed in program is also in the list of checked programs
        function isCheckedProgram(program) {
            return _.contains(vm.checkedPrograms, program.code);
        }


        // Returns true if the user has checked off at least 1 school in the find options.
        function hasSchoolFilter() {
            var result = _.findWhere(vm.schools, {
                isChecked: true
            });
            return typeof result !== 'undefined';

        }

        // Returns true if the user has checked off at least 1 program in the find options.
        function hasProgramFilter() {
            var result = _.findWhere(vm.programs, {
                isChecked: true
            });
            return typeof result !== 'undefined';
        }

        //function siteCount() {

        //    var totalLength = vm.sites.length;
        //    var filteredLength = vm.filteredSites().length;

        //    return totalLength === filteredLength ? totalLength.toString() : filteredLength.toString() + '/' + totalLength.toString();
        //}
    }
})();



