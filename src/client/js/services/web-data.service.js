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
            getRefTransport: getRefTransport,
            getCoverPhotos: getCoverPhotos,
            getChangeLog: getChangeLog
        };

        return service;

        //////////////////////// IMPLEMENTATION /////////////////////
        // WARNING!!! Because I don't have cache busting in place for json files - the v paramater below in all of the service calls has to be bumped up whenever the data changes. Certainly not a great strategy but it's what we have right now.
        function getSites() {
            return get('/data/site.data.json?v1.1');
        }
        function getSchools() {
            return get('/data/school.data.json?v1.1');
        }

        function getPrograms() {
            return get('/data/program.data.json?v1.1');
        }

        function getRefTransport() {
            return get('/data/ref-transport.data.json?v1.1');
        }

        function getMessages() {
            return get('/data/message.data.json?v1.1');
        }

        function getCoverPhotos() {
            return get('/data/cover-photo.data.json?v1.1');
        }

        function getChangeLog() {
            return get('/data/change-log.data.json?v1.1');
        }

        function get(url) {
            var deferred = $q.defer();

            $http.get(url).then(function (response) {
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
