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
                name: 'Phase 1',
                address: {
                    unitNumber: '11',
                    number: '20',
                    street: 'Island Shore Blvd.',
                    friendlyLocation: 'By Island Lakes Clock Tower',
                    city: 'Winnipeg',
                    province: 'MB',
                    postalCode: 'R3X 1N7',
                    lat: 49.8396928,
                    lng: -97.0661543,
                    markerColor: 'blue'
                },
                phone: '204-255-6751',
                schools: [
                    { code: 'IL', transportType: 'CT' },
                    { code: 'Gy', transportType: 'SB' },
                    { code: 'Sh', transportType: 'SB' }
                ],
                programs: [
                    { code: 'I', count: -1 },
                    { code: 'SA', count: -1 }
                ],
                photos: [
                     '/img/gallery/phase-1/phase1-01.jpg',
                    '/img/gallery/phase-1/phase1-02.jpg',
                    '/img/gallery/phase-1/phase1-03.jpg',
                    '/img/gallery/phase-1/phase1-04.jpg',
                    '/img/gallery/phase-1/phase1-05.jpg',
                    '/img/gallery/phase-1/phase1-06.jpg',
                    '/img/gallery/phase-1/phase1-07.jpg',
                    '/img/gallery/phase-1/phase1-08.jpg',
                    '/img/gallery/phase-1/phase1-09.jpg'
                ],
                order: 1
            };

            data.push(newSite);

            /*
             * Define Phase II Site **************************************************
             */
            newSite = {
                code: 'P2',
                shortName: '2',
                name: 'Phase 2',
                address: {
                    unitNumber: null,
                    number: '445',
                    street: 'Island Shore Blvd.',
                    friendlyLocation: 'In Island Lakes School',
                    city: 'Winnipeg',
                    province: 'MB',
                    postalCode: 'R3X 2B4',
                    lat: 49.829943,
                    lng: -97.0672877,
                    markerColor: 'red'
                },
                phone: '204-256-6808',
                schools: [
                    { code: 'IL', transportType: '???' }
                ],
                programs: [
                    { code: 'I', count: -1 },
                    { code: 'EY', count: -1 },
                    { code: 'P', count: -1 },
                    { code: 'K', count: -1 },
                    { code: 'SA', count: -1 }
                ],
                photos: [
                    '/img/gallery/phase-2/phase2-01.jpg',
                    '/img/gallery/phase-2/phase2-02.jpg',
                    '/img/gallery/phase-2/phase2-03.jpg',
                    '/img/gallery/phase-2/phase2-04.jpg',
                    '/img/gallery/phase-2/phase2-05.jpg',
                    '/img/gallery/phase-2/phase2-06.jpg',
                    '/img/gallery/phase-2/phase2-07.jpg'
                ],
                order: 2
            };

            data.push(newSite);

            /*
             * Define Phase III Site **********************************************************
             */
            newSite = {
                code: 'P3',
                shortName: '3', // Note we can only use 1 character for the map markers so don't include the A/B/C here
                name: 'Phase 3',
                address: {
                    unitNumber: '180',
                    number: '50',
                    street: 'Lakewood Blvd.',
                    friendlyLocation: 'By Mac\'s Convenience Store in Southdale',
                    city: 'Winnipeg',
                    province: 'MB',
                    postalCode: 'R2J 2M7',
                    lat: 49.8538542,
                    lng: -97.080153,
                    markerColor: 'green'
                },
                phone: '204-254-2774',
                schools: [
                    { code: 'VB', transportType: 'CT' },
                    { code: 'Ni', transportType: 'CT' },
                    { code: 'Ho', transportType: 'CT' },
                    { code: 'Fr', transportType: 'CT' }
                ],
                programs: [
                    { code: 'I', count: -1 },
                    { code: 'EY', count: -1 },
                    { code: 'P', count: -1 },
                    { code: 'K', count: -1 },
                    { code: 'SA', count: -1 }
                ],
                photos: [
                        '/img/gallery/phase-3/phase3-01.jpg',
                        '/img/gallery/phase-3/phase3-02.jpg',
                        '/img/gallery/phase-3/phase3-03.jpg',
                        '/img/gallery/phase-3/phase3-04.jpg',
                        '/img/gallery/phase-3/phase3-05.jpg',
                        '/img/gallery/phase-3/phase3-06.jpg',
                        '/img/gallery/phase-3/phase3-07.jpg',
                        '/img/gallery/phase-3/phase3-08.jpg',
                        '/img/gallery/phase-3/phase3-09.jpg',
                        '/img/gallery/phase-3/phase3-10.jpg',
                        '/img/gallery/phase-3/phase3-11.jpg'
                ],
                order: 3
            };

            data.push(newSite);

            /*
             * Define Phase IIIB Site **********************************************************************
             */
            // Don't show 3B - they don't have the capacity to answer the phones - merge with 3A
            //newSite = {
            //    code: 'P3B',
            //    shortName: '3', // Note we can only use 1 character for the map markers so don't include the A/B/C here
            //    name: 'Phase 3B',
            //    address: {
            //        unitNumber: '100',
            //        number: '40',
            //        street: 'Lakewood Blvd.',
            //        city: 'Winnipeg',
            //        province: 'MB',
            //        postalCode: 'R2J 2M6',
            //        lat: 49.854481,
            //        lng: -97.080346,
            //        markerColor: 'green'
            //    },
            //    phone: '204-257-6180',
            //    schools: [
            //        { code: 'VB', transportType: 'CT' },
            //        { code: 'Ni', transportType: 'CT' },
            //        { code: 'Ho', transportType: 'CT' },
            //        { code: 'Fr', transportType: 'CT' }
            //    ],
            //    programs: [
            //        {
            //            name: 'Infant',
            //            description: 'Under 2 years old',
            //            count: -1,
            //        },
            //        {
            //            name: 'Early Years',
            //            description: '2 year olds',
            //            count: -1,
            //        },
            //        {
            //            name: 'Preschool',
            //            description: '3/4 year olds',
            //            count: -1,
            //        },
            //        {
            //            name: 'Kinders',
            //            description: '4/5 year olds',
            //            count: -1,
            //        },
            //        {
            //            name: 'School Age',
            //            description: 'Grades 1-12',
            //            count: -1,
            //        },
            //    ],
            //    order: 4,
            //};

            //data.push(newSite);

            /*
             * Define Phase IIIC Site *************************************************************************
             */
            newSite = {
                code: 'P3C',
                shortName: '3', // Note we can only use 1 character for the map markers so don't include the A/B/C here
                name: 'Phase 3C',
                address: {
                    unitNumber: '90',
                    number: '115',
                    street: 'Vermillion Rd.',
                    friendlyLocation: 'By Shapes in Southdale',
                    city: 'Winnipeg',
                    province: 'MB',
                    postalCode: 'R2J 4A9',
                    lat: 49.8543693,
                    lng: -97.0734711,
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
                programs: [
                    { code: 'SA', count: -1 }
                ],
                photos: [],
                order: 5
            };

            data.push(newSite);

            /*
             * Define Phase IV Site **************************************************************
             */
            newSite = {
                code: 'P4',
                shortName: '4', // Note we can only use 1 character for the map markers so don't include the A/B/C here
                name: 'Phase 4',
                address: {
                    unitNumber: null,
                    number: '255',
                    street: 'Vermillion Rd.',
                    friendlyLocation: 'By Giant Tiger in Southdale',
                    city: 'Winnipeg',
                    province: 'MB',
                    postalCode: 'R2J 3Z7',
                    lat: 49.854024,
                    lng: -97.0679276,
                    markerColor: 'orange'
                },
                phone: '204-256-0672',
                schools: [
                    { code: 'VB', transportType: 'CT' },
                    { code: 'Gy', transportType: 'CT' },
                    { code: 'Sh', transportType: 'CT' },
                ],
                programs: [
                    { code: 'I', count: -1 },
                    { code: 'EY', count: -1 },
                    { code: 'P', count: -1 },
                    { code: 'K', count: -1 },
                    { code: 'SA', count: -1 }
                ],
                photos: [],
                order: 6
            };

            data.push(newSite);

            /*
             * Define Phase V Site **************************************************
             */
            newSite = {
                code: 'SC',
                shortName: '5',
                name: 'Phase 5',
                address: {
                    unitNumber: null,
                    number: '340',
                    street: 'Sage Creek Blvd',
                    friendlyLocation: 'In Sage Creek School (to be built)',
                    city: 'Winnipeg',
                    province: 'MB',
                    postalCode: 'R3X 0E1',
                    lat: 49.833390,
                    lng: -97.033599,
                    markerColor: 'red'
                },
                phone: '',
                schools: [
                ],
                programs: [
                    { code: 'I', count: 16 },
                    { code: 'EY', count: 8 },
                    { code: 'P', count: 32 },
                    { code: 'K', count: 10 },
                    { code: 'SA', count: 30 }
                ],
                introduction: 'Expected opening date is January 2017',
                messageSummary: 'Coming 2017!',
                message: ['Rainbow is very excited to announce that we were the successful candidates in the RFP for the new Daycare opening at École Sage Creek. This daycare is projected to open in January of 2017 and will have 16 infant spots, 8 early years (age 2), 32 preschool (age 3/4), 10 Kindergarten (age 4/5) and 30 school age spots.',
                          'Rainbow will be using the Manitoba Government Online Child Care Registry to fill these spots. The projected date for signing up online is Summer of 2016. Rainbow will not be taking a list until that time. Parents who need Daycare prior to this are encouraged to register online at one of our other Rainbow locations.',
                          'Rainbow is committed to keeping the Community and our Families updated on our progress as we prepare for this exciting new opportunity.'],
                photos: [],
                order: 7
            };

            data.push(newSite);

            return data;

        }
    }
})();
