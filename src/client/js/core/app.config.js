(function () {
    'use strict';

    var core = angular
        .module('app.core');

    var config = getAppConfig();

    core.constant('config', config);

    return;

    /**************************************************/

    function getAppConfig() {

        var config = {
            // Key defined at https://console.developers.google.com under my personal account - free key, can be changed at any time.
            googleApiKey: 'AIzaSyAXuaY3jzo_vEw-DwyBxmOi6orRLl7m2eI'
        };

        return config;
    }
})();