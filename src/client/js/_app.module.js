(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.data', 
        /*
         * Feature areas
         */
        'app.home',
        'app.site',
    ]);
})();