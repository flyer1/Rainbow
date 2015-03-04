(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.data', 
        /*
         * Feature areas
         */
        'app.home', // Main/landing page
        'app.site', // Daycare sites
    ]);
})();