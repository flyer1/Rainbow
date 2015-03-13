(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'datacontext', 'parallaxHelper'];

    function HomeController($scope, datacontext, parallaxHelper) {
        var vm = this;

        vm.sites = [];          // Full list of sites (centres)
        vm.schools = [];        // Full list of schools
        vm.checkedShools = [];  // List of school codes that has been checked off by the user.
        vm.hasFilteredSchools = false;
        vm.siteCount = -1;
        vm.matchedSites = {};   // List of sites that match the given filter criteria set by the user
        vm.background = {}; // TODO: remove this.

        vm.toggleSchoolFilter = toggleSchoolFilter;
        vm.hasSchoolFilter = hasSchoolFilter;
        vm.isMatchedSite = isMatchedSite;
        vm.isCheckedSchool = isCheckedSchool;
        
        init();

        $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);

        return vm;

        /******************** IMPLEMENTATION **********************/
        function init(parallaxHelper) {

            var siteRepo = datacontext.getSiteRepository();
            
            vm.sites = siteRepo.sites;
            vm.schools = siteRepo.schools;
            vm.siteSchools = siteRepo.siteSchools;
            
            setMatchedSites();   // Array of site codes that match the filter criteria set by the user
            console.log(siteRepo); // TODO: remove later


        }

        function toggleSchoolFilter(school) {
            school.isChecked = !school.isChecked;
            // An option has been changed, re-calculate the find options
            setMatchedSites();
            
        }

        // Every time a find option changes, store the matched sites so they don't have to be recomputed for each site.
        function setMatchedSites() {
            var checkedSchools = [];
            //var checkedPrograms = [];
            var matchedSites = [];
            
            // Grab the list of the checked schools
            checkedSchools = _.chain(vm.schools)
                                    .filter(function(item) {
                                        return item.isChecked;
                                    })
                                    .pluck('code')
                                    .value();
            
            if (checkedSchools.length === 0) {
                // No schools checked. Return sites for all schools.
                checkedSchools = _.pluck(vm.schools, 'code');
            }
            
            _.forEach(checkedSchools, function(item) {
                var results = _.where(vm.siteSchools, { 'schoolCode' : item });
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
            vm.checkedShools = checkedSchools;
            console.log(matchedSites);
            return;
        }
        
        // Returns true if the find options match a given site
        function isMatchedSite(site) {
            return (_.contains(vm.matchedSites, site.code));
        }
        
        // Returns true if the passed in school is also in the list of checked schools 
        function isCheckedSchool(school) {
            return _.contains(vm.checkedShools, school.code);
        }
        
        // Returns true if the user has checked off at least 1 school in the find options.
        function hasSchoolFilter() {
            var result = _.findWhere(vm.schools, { isChecked : true});
            console.log( typeof result !== "undefined");
            return typeof result !== "undefined";
            
        }
    
        function siteCount() {

            var totalLength = vm.sites.length;
            var filteredLength = vm.filteredSites().length;

            return totalLength === filteredLength ? totalLength.toString() : filteredLength.toString() + '/' + totalLength.toString();
        }
        

        //      src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=350x350&maptype=roadmap
        //&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
        //&markers=color:red%7Clabel:C%7C40.718217,-73.998284" data-bind="tooltip:{title: 'Click to open in Google Maps', placement: 'center'}">


        //}
    }
})();




// TODO: swap filtering for css height
//height: 0;
//overflow: hidden;
//padding: 0;
//border: none;