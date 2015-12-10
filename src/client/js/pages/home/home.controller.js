(function () {
    'use strict';

    angular
        .module('app.pages')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$window', '$scope', '$timeout', '$sce', 'siteService', 'siteData'];

    function HomeController($window, $scope, $timeout, $sce, siteService, siteData) {
        var vm = this;

        // Properties
        vm.sites = []; // Full list of sites (centres)
        vm.schools = []; // Full list of schools
        vm.programs = []; // Full list of schools
        vm.checkedSchoolCodes = []; // List of school codes that has been checked off by the user.
        vm.checkedProgramCodes = []; // List of program codes that has been checked off by the user.
        vm.matchedSites = []; // List of sites that match the given filter criteria set by the user
        vm.photos = [];

        // Functions
        vm.toggleFilter = toggleFilter;
        vm.hasSchoolFilter = hasSchoolFilter;
        vm.hasProgramFilter = hasProgramFilter;
        vm.isCheckedSchool = isCheckedSchool;
        vm.isCheckedProgram = isCheckedProgram;

        init(siteData);

        return vm;

        /******************** IMPLEMENTATION **********************/
        function init(siteData) {
            vm.sites = siteData.sites;
            vm.schools = siteData.schools;
            vm.programs = siteData.programs;
            vm.siteSchools = siteData.siteSchools;
            vm.messages = siteData.messages;
            vm.photos = initPhotos();

            setMatchedSites(); // Array of site codes that match the filter criteria set by the user
            $window.jon = vm;
        }

        function initPhotos() {

            var photos = siteService.getSitePhotos(null, siteData.coverPhotos);

            _.each(siteData.sites, function (site) {
                photos = photos.concat(siteService.getSitePhotos(site, site.photos));
            });
            return photos;
        }

        // #region FILTER METHODS --------------------
        function toggleFilter(item) {
            item.isChecked = !item.isChecked;
            // An option has been changed, re-calculate the find options
            setMatchedSites();
        }

        // Every time a find option changes, store the matched sites so they don't have to be recomputed for each site.
        function setMatchedSites() {
            var checkedSchoolCodes = [];
            var checkedProgramCodes = [];

            // Grab the list of the checked schools
            checkedSchoolCodes = _.pluck(_.filter(vm.schools, { isChecked: true }), 'code');

            if (checkedSchoolCodes.length === 0) {
                // No schools checked so all schools are to be considered
                checkedSchoolCodes = _.pluck(vm.schools, 'code');
            }

            // Grab the list of the checked programs
            checkedProgramCodes = _.pluck(_.filter(vm.programs, { isChecked: true }), 'code');

            if (checkedProgramCodes.length === 0) {
                // No programs checked so all programs are to be considered
                checkedProgramCodes = _.pluck(vm.programs, 'code');
            }

            vm.matchedSites = siteService.getMatchedSites(vm.sites, checkedSchoolCodes, checkedProgramCodes);

            // The matched sites now contains an array of site codes that match the user's find options.
            vm.checkedSchoolCodes = checkedSchoolCodes;
            vm.checkedProgramCodes = checkedProgramCodes;

            // Also set the boolean on each site to indicate if it contains at least 1 match to the filter criteria. This helps on deciding if the site should be shown/hidden.
            _.each(vm.sites, function (site) {
                site.isChecked = _.contains(vm.matchedSites, site.code);
            });

            return;
        }

        // Returns true if the passed in school is also in the list of checked schools
        function isCheckedSchool(school) {
            return _.contains(vm.checkedSchoolCodes, school.code);
        }

        // Returns true if the passed in program is also in the list of checked programs
        function isCheckedProgram(program) {
            return _.contains(vm.checkedProgramCodes, program.code);
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

        // #endregion
    }
})();



