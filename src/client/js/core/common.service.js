(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('common', common);

    common.$inject = ['$document'];

    function common($document) {

        var service = {
            helpers: {
                getBody: getBody,
                isEmpty: isEmpty
            }
        };

        return service;

        /****************************** IMPLEMENTATION ****************************/

        function isEmpty(value) {
            return angular.isUndefined(value) || value === '' || value === null;
        }

        function getBody() {
            var result = angular.element($document[0].body);
            return result;
        }
    }
})();