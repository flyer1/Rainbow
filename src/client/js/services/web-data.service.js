(function () {
    'use strict';

    angular.module('app.services')
           .factory('webDataService', webDataService);

    webDataService.$inject = ['$http', '$q'];

    function webDataService($http, $q) {

        var service = {
            get: get,
            getSites: getSites,
            getSchools: getSchools,
            getPrograms: getPrograms,
            getMessages: getMessages,
            getCoverPhotos: getCoverPhotos
        };

        return service;

        //////////////////////// IMPLEMENTATION /////////////////////
        function getSites() {
            return get('/data/site.data.json');
        }
        function getSchools() {
            return get('/data/school.data.json');
        }

        function getPrograms() {
            return get('/data/program.data.json');
        }

        function getMessages() {
            return get('/data/message.data.json');
        }

        function getCoverPhotos() {
            return get('/data/cover-photo.data.json');
        }

        function get(url) {
            var deferred = $q.defer();

            $http.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (response) {
                    console.error('Error occured while calling ' + url, response);
                    deferred.reject({ data: response.data, status: response.status });
                });

            return deferred.promise;
        }
    }
})();
