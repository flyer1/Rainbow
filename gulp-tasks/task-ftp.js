var ftp = require('vinyl-ftp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

module.exports = function (gulp, plugin, help, utils) {

    help.registerHelp('ftp', {
        description: 'Uploads the contents of the dist folder to the server hosting the site. The credentials need to be supplied by you.'
    });

    /******** TASK ********/
    gulp.task('ftp', function () {
        /*
            Create a json file called credentials.json with the following structure and enter in your login information there.
            {
                "host": "HOST-VALUE",
                "user": "USERID-VALUE",
                "password": "PASSWORD-VALUE"
            }
        */
        var config = require('../../secure-assets/credentials.json');

        utils.logMsg('Connecting to website ' + config.host + ' with user ' + config.user + ' to upload the website ');

        var conn = ftp.create({
            host: config.host,
            user: config.user,
            password: config.password,
            parallel: 10,
            log: gutil.log
        });

        var globs = ['./dist/**'];

        // turn off buffering in gulp.src for best performance
        return gulp.src(globs, { base: './dist', buffer: false })
            .pipe(conn.differentSize('/public_html')) // only upload files that have changed
            .pipe(conn.dest('/httpdocs'));
    });


};

