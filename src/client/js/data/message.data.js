(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('messageData', messageData);

    function messageData() {

        var service = {
            getMessages: getMessages,
        };

        return service;


        /************************** IMPLEMENTATION ********************************/
        function getMessages() {
            var messages = "Rainbow Daycare is coming to Sage Creek school! Expected opening January 2017";
            return messages;
        }
    }

})();
