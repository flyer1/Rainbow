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


        /************************** IMPLEMENTATION ********************************/
        function getSchools() {
            var schools = [
                {
                    code: 'IL',
                    name: 'Island Lake School',
                    website: 'https://www.lrsd.net/schools/Island/Pages/default.aspx',
                    address: '445 Island Shore Blvd',
                    postalCode: 'R3X 2B4',
                    lat: 9.829775,
                    lng: -97.0618756,
                },
                {
                    code: 'Gy',
                    name: 'École Guyot',
                    website: 'https://www.lrsd.net/schools/Guyot/Pages/default.aspx',
                    address: '400 Willowlake Crescent',
                    postalCode: 'R2J 3K2',
                    lat: 49.844541,
                    lng: -97.084674,
                },
                {
                    code: 'Sh',
                    name: 'Shamrock School',
                    website: 'https://www.lrsd.net/schools/Shamrock/Pages/default.aspx',
                    address: '831 Beaverhill Blvd',
                    postalCode: 'R2J 3K1',
                    lat: 49.8465875,
                    lng: -97.063782,
                },
                {
                    code: 'VB',
                    name: 'Van Bellegham',
                    website: 'https://www.lrsd.net/schools/Belleghem/Pages/default.aspx',
                    address: '10 Vermillion Rd',
                    postalCode: 'R2J 2T1',
                    lat: null,  // TODO: Finish up the lat/lng
                    lng: null,
                },
                {
                    code: 'Ni',
                    name: 'Niakwa',
                    website: 'https://www.lrsd.net/schools/Niakwa/Pages/default.aspx',
                    address: '200 Pebble Beach Rd',
                    postalCode: 'R2J 3K3',
                    lat: null,  // TODO: Finish up the lat/lng
                    lng: null,
                },
                {
                    code: 'Ho',
                    name: 'Howden',
                    website: 'https://www.lrsd.net/schools/Howden/Pages/default.aspx',
                    address: '150 Howden Rd',
                    postalCode: 'R2J 1L3',
                    lat: null,  // TODO: Finish up the lat/lng
                    lng: null,
                },
                {
                    code: 'Fr',
                    name: 'Frontenac',
                    address: '866 Autumnwood Dr',
                    postalCode: 'R2J 1C1',
                    lat: null,  // TODO: Finish up the lat/lng
                    lng: null,
                },
            ];

            return schools;
        }
    }

})();
