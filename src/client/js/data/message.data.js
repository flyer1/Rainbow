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
            var messages = {
                banner: {
                        summary: 'Rainbow Daycare is coming to Sage Creek school! Expected opening January 2017',
                        full: 'Rainbow is very excited to announce that we were the successful candidates in the RFP for the new Daycare opening at École Sage Creek. This daycare is projected to open in January of 2017 and will have 16 infant spots, 8 early years (age 2), 32 preschool (age 3/4), 10 Kindergarten (age 4/5) and 30 school age spots.<br/><br/>' +
                              'Rainbow will be using the Manitoba Government Online Child Care Registry to fill these spots. The projected date for signing up online is Summer of 2016. Rainbow will not be taking a list until that time. Parents who need Daycare prior to this are encouraged to register online at one of our other Rainbow locations.<br/><br/>' +
                              'Rainbow is committed to keeping the Community and our Families updated on our progress as we prepare for this exciting new opportunity. '
                          }
            };
            return messages;
        }
    }

})();
