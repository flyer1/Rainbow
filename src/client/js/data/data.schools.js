(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('dataSchools', dataSchools);

    function dataSchools() {

        var service = {
            getData: getData,
        };

        return service;
        
        function getData() {
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

            return schools;
        }
    }
})();
