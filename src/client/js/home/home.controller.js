(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('Shell', HomeController);

    HomeController.$inject = ['datacontext'];

    function HomeController(datacontext) {
        var vm = this;
        return vm;

        //var vm = {
        //    sites: sites,
        //    filteredSites: filteredSites,
        //    schools: schools,
        //    hasFilteredSchools: hasFilteredSchools,
        //    siteCount: siteCount,
        //    init: init,
        //    handleFilterChanged: handleFilterChanged,
        //};
        //var sites = ko.observableArray();
        //var schools = ko.observableArray();
        //var filteredSites = ko.observableArray();
        //return vm;

        /******************** IMPLEMENTATION **********************/
        /*   function init() {
  
              var data = datacontext.sites.getSiteRepository();
  
              extractMetaData(data);
  
              vm.sites(ko.mapping.fromJS(data, siteMappingOptions)());
              vm.filteredSites(vm.sites());
  
              ko.applyBindings(vm, $('#rainbow')[0]);
          };
  
          function extractMetaData(siteRepo) {
              var schoolAry = [];
  
              // Flatten the list of all schools in the site repository (there will be duplicates)
              var allSchools = _.chain(siteRepo)
                .map(function (site) {
                    return site.schools;
                })
                .reduce(function (memo, ary) {
                    return memo.concat(ary);
                })
                .value();
  
              // Now count the duplicates and create 1 school object per unique instance and add a properties.
              var schoolAry = _.chain(allSchools)
                .groupBy('name')
                .map(function (grouping) {
                    var index = grouping[0];
                    return {
                        name: index.name,
                        lat: index.lat,
                        lng: index.lng,
                        transportType: index.transportType,
                        count: grouping.length,
                        isChecked: false,
                    };
                })
                .value();
  
              vm.schools(ko.mapping.fromJS(schoolAry)());
          }
      };
  
      function handleFilterChanged(data, event) {
          var filterOpts = getFilterOpts();
          filterSites(filterOpts);
          return true;
      };
  
      function getFilterOpts() {
          // Figure out which schools are checked
          var schoolNames = _.chain(ko.mapping.toJS(vm.schools()))
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
          var tmpSites = ko.observableArray([]); // Build up the filtered sites in a separate array to avoid extra DOM updates due to data binding
  
          if (filterOpts.schoolNames.length === 0) {
              // no items checked therefore return all sites
              vm.filteredSites(vm.sites());
              return;
          }
  
          for (var i = 0; i < vm.sites().length; i++) {
              var currSchools = ko.mapping.toJS(vm.sites()[i].schools());
              var schoolNames = _.pluck(currSchools, 'name');
              var result = _.intersection(filterOpts.schoolNames, schoolNames);
              if (result.length > 0) {
                  tmpSites.push(vm.sites()[i]);
              }
          }
  
          vm.filteredSites(tmpSites());
  
      };
  
      var siteCount = ko.computed({
          read: function () {
              var totalLength = vm.sites().length;
              var filteredLength = vm.filteredSites().length;
  
              return totalLength === filteredLength ? totalLength.toString() : filteredLength.toString() + '/' + totalLength.toString();
          },
          deferEvaluation: true
      });
  
      var hasFilteredSchools = ko.computed({
          read: function () {
              return _.filter(schools(), function (item) { return item.isChecked(); }).length === 0;
          },
          deferEvaluation: true
      });
  
      // #region SiteVM
  
      var SiteVM = function (data) {
  
          ko.mapping.fromJS(data, {}, this);
  
          this.address.addressLine1 = ko.computed(function () {
              return (this.address.unitNumber() ? this.address.unitNumber() + '-' : '') + this.address.number() + ' ' + this.address.street();
          }, this);
  
          this.address.addressLine2 = ko.computed(function () {
              return this.address.city() + ', ' + this.address.province() + ' ' + this.address.postalCode();
          }, this);
  
          this.address.staticMapSrc = ko.computed(function () {
              var baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
              var address = this.address.number() + '+' + this.address.street() + ',' + this.address.city() + ',' + this.address.province() + ',' + this.address.postalCode();
              var marker = '&markers=color:' + this.address.markerColor() + '%7Clabel:' + this.shortName() + '%7C' + this.address.lat() + ' ,' + this.address.lng();
              var arguments = '?center=' + address + '&zoom=14&size=450x250&maptype=roadmap' + marker;
              return baseUrl + arguments;
          }, this);
  
          this.schoolShortNames = ko.computed({
              read: function () {
                  return _.pluck(ko.mapping.toJS(this.schools()), 'shortName').join();
              },
              deferEvaluation: true
          }, this);
      };
  
      //      src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=350x350&maptype=roadmap
      //&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
      //&markers=color:red%7Clabel:C%7C40.718217,-73.998284" data-bind="tooltip:{title: 'Click to open in Google Maps', placement: 'center'}">
  
      var siteMappingOptions = {
          create: function (options) {
              return new SiteVM(options.data);
          },
      };
      */
    }
})();




// TODO: swap filtering for css height
//height: 0;
//overflow: hidden;
//padding: 0;
//border: none;