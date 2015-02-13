(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('schoolData', schoolData);

    function schoolData() {

        var service = {
            getSchools: getSchools,
        };

        return service;
        
        function getSchools() {
            var schools = {
                islandLake: {
                    code: 'IL',
                    name: 'Island Lake School',
                    lat: 9.829775,
                    lng: -97.0618756,
                },
                guyot: {
                    code: 'Gy',
                    name: 'École Guyot',
                    lat: 49.844541,
                    lng: -97.084674,
                },
                shamrock: {
                    code: 'Sh',
                    name: 'Shamrock School',
                    lat: 49.8465875,
                    lng: -97.063782,
                },
                vanBellegham: {
                    code: 'VB',
                    name: "Van Bellegham",
                    lat: null,  // TODO: Finish up the lat/lng
                    lng: null,
                },
                niakwa: {
                    code: 'Ni',
                    name: "Niakwa",
                    lat: null,  // TODO: Finish up the lat/lng
                    lng: null,
                },
                howden: {
                    code: 'Ho',
                    name: "Howden",
                    lat: null,  // TODO: Finish up the lat/lng
                    lng: null,
                },
                frontenac: {
                    code: 'Fr',
                    name: "Frontenac",
                    lat: null,  // TODO: Finish up the lat/lng
                    lng: null,
                },
            };

            return schools;
        }
    }
})();
