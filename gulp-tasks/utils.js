module.exports = function () {

    var service = {
        getUtils: getUtils
    };

    return service;
    /////////////////////////////

    function getUtils(plugin) {
        var utils = {
            logMsg: function(msg) {
                plugin.util.log(plugin.util.colors.cyan(msg));
            },
            logFileProgress: function (currFile) {
                return 'Processing: ' + currFile;
            }
        };

        return utils;
    }
}
