define('dataaccess/dataservice', ['dataaccess/dataservice.core'],
  function (core) {

      var schools = {
          islandLake: {
              name: 'Island Lake School',
              shortName: 'IL',
              lat: 9.829775,
              lng: -97.0618756,
          },
          guyot: {
              name: 'École Guyot',
              shortName: 'Gy',
              lat: 49.844541,
              lng: -97.084674,
          },
          shamrock: {
              name: 'Shamrock School',
              shortName: 'Sh',
              lat: 49.8465875,
              lng: -97.063782,
          },
          vanBellegham: {
              name: "Van Bellegham",
              shortName: 'VB',
              lat: null,
              lng: null,
          },
          niakwa: {
              name: "Niakwa",
              shortName: 'Ni',
              lat: null,
              lng: null,
          },
          howden: {
              name: "Howden",
              shortName: 'Ho',
              lat: null,
              lng: null,
          },
          frontenac: {
              name: "Frontenac",
              shortName: 'Fr',
              lat: null,
              lng: null,
          },
      };

      var addSchool = function (newSite, school, transportType) {
          var newSchool = $.extend({}, school, {
              transportType: transportType
          });
          newSite.schools.push(newSchool);
      };

      var sites = {
          getSiteRepository: function () {
              return $.Deferred(function (def) {

                  var data = [];

                  // A note to a future maintainer. Instead of hosting the data in a database, it is defined here instead in a regular javascript object.
                  // Any changes made to existing properties will be reflected on the website thru the databinding (via knockout).
                  // If you have to add or change a given property (eg: you need to add a new property called schoolType for eg), then you need to update the databinding
                  // in the views to take advantage of this change.

                  /*
                   * Define Phase I Site *********************************************
                   */
                  var newSite = {
                      shortName: '1',
                      name: 'Phase I',
                      address: {
                          unitNumber: '11',
                          number: "20",
                          street: "Island Shore Blvd.",
                          city: "Winnipeg",
                          province: "MB",
                          postalCode: "R3X 1N7",
                          lat: 49.8382149,
                          lng: -97.0691446,
                          markerColor: 'blue'
                      },
                      phone: '204-255-6751',
                      schools: [],
                      order: 1,
                  };

                  // Add the schools that the site services
                  addSchool(newSite, schools.islandLake, 'Centre Transport');
                  addSchool(newSite, schools.guyot, 'School Bus');
                  addSchool(newSite, schools.shamrock, 'School Bus');
                  data.push(newSite);

                  /*
                   * Define Phase II Site **************************************************
                   */
                  newSite = {
                      shortName: '2',
                      name: 'Phase II',
                      address: {
                          unitNumber: null,
                          number: "445",
                          street: "Island Shore Blvd.",
                          city: "Winnipeg",
                          province: "MB",
                          postalCode: "R3X 2B4",
                          lat: 49.8306133,
                          lng: -97.0663465,
                          markerColor: 'red'
                      },
                      phone: '204-256-6808',
                      schools: [],
                      order: 2,
                  };

                  // Add the schools that the site services
                  addSchool(newSite, schools.islandLake, '???');
                  data.push(newSite);

                  /*
                   * Define Phase IIIA Site **********************************************************
                   */
                  newSite = {
                      shortName: '3', // Note we can only use 1 character for the map markers so don't include the A/B/C here
                      name: 'Phase IIIA',
                      address: {
                          unitNumber: '180',
                          number: "50",
                          street: "Lakewood Blvd.",
                          city: "Winnipeg",
                          province: "MB",
                          postalCode: "R2J 2M7",
                          lat: 49.853997,
                          lng: -97.079135,
                          markerColor: 'green'
                      },
                      phone: '204-254-2774',
                      schools: [],
                      order: 3,
                  };

                  // Add the schools that the site services
                  addSchool(newSite, schools.vanBellegham, 'Centre Transport');
                  addSchool(newSite, schools.niakwa, 'Centre Transport');
                  addSchool(newSite, schools.howden, 'Centre Transport');
                  addSchool(newSite, schools.frontenac, 'Centre Transport');

                  data.push(newSite);

                  /*
                   * Define Phase IIIB Site **********************************************************************
                   */
                  newSite = {
                      shortName: '3', // Note we can only use 1 character for the map markers so don't include the A/B/C here
                      name: 'Phase IIIB',
                      address: {
                          unitNumber: '100',
                          number: "40",
                          street: "Lakewood Blvd.",
                          city: "Winnipeg",
                          province: "MB",
                          postalCode: "R2J 2M6",
                          lat: 49.8545685,
                          lng: -97.078809,
                          markerColor: 'green'
                      },
                      phone: '204-257-6180',
                      schools: [],
                      order: 4,
                  };

                  // Add the schools that the site services
                  addSchool(newSite, schools.vanBellegham, 'Centre Transport');
                  addSchool(newSite, schools.niakwa, 'Centre Transport');
                  addSchool(newSite, schools.howden, 'Centre Transport');
                  addSchool(newSite, schools.frontenac, 'Centre Transport');

                  data.push(newSite);

                  /*
                   * Define Phase IIIC Site *************************************************************************
                   */
                  newSite = {
                      shortName: '3', // Note we can only use 1 character for the map markers so don't include the A/B/C here
                      name: 'Phase IIIC',
                      address: {
                          unitNumber: '90',
                          number: "115",
                          street: "Vermillion Rd.",
                          city: "Winnipeg",
                          province: "MB",
                          postalCode: "R2J 4A9",
                          lat: 49.854044,
                          lng: -97.070653,
                          markerColor: 'green'
                      },
                      phone: '204-255-3985',
                      schools: [],
                      order: 5,
                  };

                  // Add the schools that the site services
                  addSchool(newSite, schools.vanBellegham, 'Centre Transport');
                  addSchool(newSite, schools.niakwa, 'Centre Transport');
                  addSchool(newSite, schools.howden, 'Centre Transport');
                  addSchool(newSite, schools.frontenac, 'Centre Transport');
                  addSchool(newSite, schools.guyot, 'Centre Transport');
                  addSchool(newSite, schools.shamrock, 'Centre Transport');

                  data.push(newSite);

                  /*
                   * Define Phase IV Site **************************************************************
                   */
                  newSite = {
                      shortName: '4', // Note we can only use 1 character for the map markers so don't include the A/B/C here
                      name: 'Phase IV',
                      address: {
                          unitNumber: null,
                          number: "255",
                          street: "Vermillion Rd.",
                          city: "Winnipeg",
                          province: "MB",
                          postalCode: "R2J 3Z7",
                          lat: 49.854056,
                          lng: -97.065906,
                          markerColor: 'orange'
                      },
                      phone: '204-256-0672',
                      schools: [],
                      order: 6,
                  };

                  data.push(newSite);

                  // Add the schools that the site services
                  addSchool(newSite, schools.vanBellegham, 'Centre Transport');
                  addSchool(newSite, schools.guyot, 'Centre Transport');
                  addSchool(newSite, schools.shamrock, 'Centre Transport');

                  def.resolve(data);
              });
          },
      };

      var refData = {
          getSchools: function () {
              return $.Deferred(function (def) {
                  var schoolAry = [];

                  for (var property in schools) {
                      if (schools.hasOwnProperty(property)) {
                          schoolAry.push(schools[property]);
                      }
                  }

                  def.resolve(schoolAry);
              });
          }
      };

      return {
          sites: sites,
          refData: refData,
      };
  });