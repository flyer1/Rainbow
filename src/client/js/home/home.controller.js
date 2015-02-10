(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['datacontext'];

    function HomeController(datacontext) {
        var vm = this;

        vm.sites = [];
        vm.filteredSites = [];
        vm.schools = [];
        vm.hasFilteredSchools = false;
        vm.siteCount = -1;
        vm.handleFilterChanged = handleFilterChanged;

        init();

        return vm;

        /******************** IMPLEMENTATION **********************/
        function init() {

            vm.sites = datacontext.getSites();
            vm.filteredSites = vm.sites;
            vm.schools = datacontext.getSchoolGroups();

            console.log(vm.sites[0]); // TODO: remove later
            console.log(vm.schools[0]); // TODO: remove later

        };

        function handleFilterChanged() {
            var filterOpts = getFilterOpts();
            filterSites(filterOpts);
            return true;
        };

        function getFilterOpts() {
            // Figure out which schools are checked
            var schoolNames = _.chain(vm.schools())
              .filter(function (item) {
                  return item.isChecked;
              })
              .pluck('name')
              .value();

            return {
                schoolNames: schoolNames
            };
        };

        function filterSites(filterOpts) {
            // Filter the sites by school
            var tmpSites = []; // Build up the filtered sites in a separate array to avoid extra DOM updates due to data binding

            if (filterOpts.schoolNames.length === 0) {
                // no items checked therefore return all sites
                vm.filteredSites = vm.sites;
                return;
            }

            for (var i = 0; i < vm.sites.length; i++) {
                var currSchools = vm.sites[i].schools;
                var schoolNames = _.pluck(currSchools, 'name');
                var result = _.intersection(filterOpts.schoolNames, schoolNames);
                if (result.length > 0) {
                    tmpSites.push(vm.sites[i]);
                }
            }

            vm.filteredSites = tmpSites;

        };

        //var siteCount = ko.computed({
        //    read: function () {
        //        var totalLength = vm.sites().length;
        //        var filteredLength = vm.filteredSites().length;

        //        return totalLength === filteredLength ? totalLength.toString() : filteredLength.toString() + '/' + totalLength.toString();
        //    },
        //    deferEvaluation: true
        //});

        //var hasFilteredSchools = ko.computed({
        //    read: function () {
        //        return _.filter(schools(), function (item) { return item.isChecked(); }).length === 0;
        //    },
        //    deferEvaluation: true
        //});

        // #region SiteVM

        //var SiteVM = function (data) {

        //    ko.mapping.fromJS(data, {}, this);

        //    this.address.addressLine1 = ko.computed(function () {
        //        return (this.address.unitNumber() ? this.address.unitNumber() + '-' : '') + this.address.number() + ' ' + this.address.street();
        //    }, this);

        //    this.address.addressLine2 = ko.computed(function () {
        //        return this.address.city() + ', ' + this.address.province() + ' ' + this.address.postalCode();
        //    }, this);

        //    this.address.staticMapSrc = ko.computed(function () {
        //        var baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
        //        var address = this.address.number() + '+' + this.address.street() + ',' + this.address.city() + ',' + this.address.province() + ',' + this.address.postalCode();
        //        var marker = '&markers=color:' + this.address.markerColor() + '%7Clabel:' + this.shortName() + '%7C' + this.address.lat() + ' ,' + this.address.lng();
        //        var args = '?center=' + address + '&zoom=14&size=450x250&maptype=roadmap' + marker;
        //        return baseUrl + args;
        //    }, this);

        //    this.schoolShortNames = ko.computed({
        //        read: function () {
        //            return _.pluck(ko.mapping.toJS(this.schools()), 'shortName').join();
        //        },
        //        deferEvaluation: true
        //    }, this);
        //};

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