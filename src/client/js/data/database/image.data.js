(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('imageData', imageData);

    function imageData() {

        var service = {
            getCoverPhotos: getCoverPhotos
        };

        return service;

        /************************** DATA - IMAGES ************************************************/
        function getCoverPhotos() {
            var photos = [
                '/img/gallery/cover/cover-01.jpg',
                '/img/gallery/cover/cover-02.jpg',
                '/img/gallery/cover/cover-03.jpg',
                '/img/gallery/cover/cover-04.jpg',
                '/img/gallery/cover/cover-05.jpg',
                '/img/gallery/cover/cover-06.jpg',
                '/img/gallery/cover/cover-07.jpg'
            ];

            return photos;
        }
    }
})();
