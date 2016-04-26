var del = require('del');

module.exports = function (gulp, plugin, help, utils) {

    help.registerHelp('css', {
        description: 'Compiles LESS files to an app.css'
    });

    // Compile the LESS files to app.css
    gulp.task('css', ['clean-css'], function () {
        utils.logMsg('Compiling Less --> CSS file');

        return gulp
            .src('./src/client/css/site.less')
            .pipe(plugin.plumber()) // exit gracefully if something fails after this
            .pipe(plugin.less())
            .pipe(plugin.print(utils.logFileProgress))
            //.pipe(plugin.autoprefixer())
            .pipe(gulp.dest('./src/client/css/'));
    });

    help.registerHelp('watch-less', {
        description: 'Creates a new css file when any of the LESS files change'
    });

    // Watch for changes to LESS files and recompile CSS when changes occur
    gulp.task('watch-less', function () {
        gulp.watch('./src/client/css/*.less', ['css']);
    });

    // Remove existing css file
    gulp.task('clean-css', function () {
        var files = './src/client/css/site.css';
        return del(files);
    });

};