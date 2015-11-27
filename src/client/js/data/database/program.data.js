(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('programData', programData);

    function programData() {

        var service = {
            getPrograms: getPrograms
        };

        return service;


        /************************** IMPLEMENTATION ********************************/
        function getPrograms() {
            var programs = [
                    {
                        code: 'I',
                        name: 'Infant',
                        description: 'Under 2 years old'
                    },
                    {
                        code: 'EY',
                        name: 'Early Years',
                        description: '2 year olds'
                    },
                    {
                        code: 'P',
                        name: 'Preschool',
                        description: '3/4 year olds'
                    },
                    {
                        code: 'K',
                        name: 'Kinders',
                        description: '4/5 year olds'
                    },
                    {
                        code: 'SA',
                        name: 'School Age',
                        description: 'Grades 1-12 - WRONG!!!!!!!!!!'
                    }
            ];

            return programs;
        }
    }

})();
