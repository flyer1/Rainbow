// The core data for the site can be found here.
(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('siteData', siteData);

    function siteData() {

        var service = {
            getSites: getSites
        };

        return service;

        /************************** DATA - SITES ************************************************/
        function getSites() {

            var data = [];

            /*
             * Define Phase I Site *********************************************
             */
            var newSite = {
                code: 'P1',
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
                schools: [ 
                    { code: 'IL', transportType: 'CT' },
                    { code: 'Gy', transportType: 'SB' },
                    { code: 'Sh', transportType: 'SB' }
                ],
                order: 1,
            };

            data.push(newSite);

            /*
             * Define Phase II Site **************************************************
             */
            newSite = {
                code: 'P2',
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
                schools: [
                    { code: 'IL', transportType: '???' }
                ],
                order: 2,
            };

            data.push(newSite);

            /*
             * Define Phase IIIA Site **********************************************************
             */
            newSite = {
                code: 'P3A',
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
                schools: [
                    { code: 'VB', transportType: 'CT' },
                    { code: 'Ni', transportType: 'CT' },
                    { code: 'Ho', transportType: 'CT' },
                    { code: 'Fr', transportType: 'CT' }
                ],
                order: 3,
            };

            data.push(newSite);

            /*
             * Define Phase IIIB Site **********************************************************************
             */
            newSite = {
                code: 'P3B',
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
                schools: [
                    { code: 'VB', transportType: 'CT' },
                    { code: 'Ni', transportType: 'CT' },
                    { code: 'Ho', transportType: 'CT' },
                    { code: 'Fr', transportType: 'CT' }
                ],
                order: 4,
            };
            
            data.push(newSite);

            /*
             * Define Phase IIIC Site *************************************************************************
             */
            newSite = {
                code: 'P3C',
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
                schools: [
                    { code: 'VB', transportType: 'CT' },
                    { code: 'Ni', transportType: 'CT' },
                    { code: 'Ho', transportType: 'CT' },
                    { code: 'Fr', transportType: 'CT' },
                    { code: 'Gy', transportType: 'CT' },
                    { code: 'Sh', transportType: 'CT' }
                        ],
                order: 5,
            };

            data.push(newSite);

            /*
             * Define Phase IV Site **************************************************************
             */
            newSite = {
                code: 'P4',
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
                schools: [
                    { code: 'VB', transportType: 'CT' },
                    { code: 'Gy', transportType: 'CT' },
                    { code: 'Sh', transportType: 'CT' },
                        ],
                order: 6,
            };

            data.push(newSite);
            
            return data;

        }
    }
})();

