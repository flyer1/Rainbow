var yargs = require('yargs');

module.exports = function (gulp, plugin, help, utils) {

    help.registerHelp('serve', {
        description: 'Starts up a lightweight server to host the website. You can then go to localhost:8080 in your browser to view. Pass --PROD argument to serve from dist directory'
    });

    // Compile the LESS files to app.css
    gulp.task('serve', function () {
        var folder = './src/client/';
        var folderDescription = 'DEV';

        if (yargs.argv.PROD || yargs.argv.prod) {
            folder = './dist/';
            folderDescription = 'PROD';
        }

        utils.logMsg('Starting up http-server node module in the ' + folderDescription + ' folder (' + folder + ')');

        utils.logMsg('Browse to http://localhost:8080');
        var exec = require('child_process').exec;
        exec('http-server ' + folder);
    });

};