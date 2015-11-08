module.exports = function () {

    var config = require('./gulp-paths.json');

    var service = {
        getConfig: getConfig
    };

    return service;
    /////////////////////////////

    function getConfig() {
        return config;
    }
}