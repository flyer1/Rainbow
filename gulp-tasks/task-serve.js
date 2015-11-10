module.exports = function (gulp, plugin, help, utils) {

    help.registerHelp('serve', {
        description: 'Starts up a lightweight server to host the website. You can then go to localhost:8080 in your browser to view.'
    });

    // Compile the LESS files to app.css
    gulp.task('serve', function () {
        utils.logMsg('Starting up http-server node module...');

        utils.logMsg('Browse to http://localhost:8080');
        var exec = require('child_process').exec;
        exec('http-server');
    });

};