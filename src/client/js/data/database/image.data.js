(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('imageData', imageData);

    imageData.$inject = ['config'];

    function imageData(config) {

        var service = {
            getSitePhotos: getSitePhotos
        };

        return service;

        /************************** DATA - IMAGES ************************************************/
        function getSitePhotos(code) {

            var files = [];

            switch (code) {
                case 'P0':
                    files = getFileNames('cover', 'cover-', 7);
                    break;
                case 'P1':
                    files = getFileNames('phase-1', 'phase1-', 9);
                    break;
                case 'P2':
                    files = getFileNames('phase-2', 'phase2-', 7);
                    break;
                case 'P3':
                    files = getFileNames('phase-3', 'phase3-', 11);
                    break;
                case 'P4':
                    break;
                case 'P5':
                    break;
            }
            return files;
        }

        function getFileNames(folderName, filePrefix, photoCount) {
            var files = [];
            _.times(photoCount, function (n) {
                files.push(config.galleryRootUri + folderName + '/' + filePrefix + _.padLeft(n + 1, 2, '0') + '.jpg');
            });

            return files;
        }
    }
})();
