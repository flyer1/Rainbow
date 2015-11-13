module.exports = function () {

    var service = {
        getUtils: getUtils
    };

    return service;
    /////////////////////////////

    function getUtils(plugin) {
        var utils = {
            /**
          * Log a message or series of messages using chalk's cyan color.
          * Can pass in a string, object or array.
          */
            logMsg: function (msg) {
                if (typeof (msg) === 'object') {
                    for (var item in msg) {
                        if (msg.hasOwnProperty(item)) {
                            plugin.util.log(plugin.util.colors.cyan(msg[item]));
                        }
                    }
                } else {
                    plugin.util.log(plugin.util.colors.cyan(msg));
                }

            },
            logFileProgress: function (currFile) {
                return 'Processing: ' + currFile;
            }
        }

        return utils;
    }
}
