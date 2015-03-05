var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Compile less to css
 * @return {Stream}
 */
gulp.task('css', ['clean-css'], function() {
    console.log('Compiling Less --> CSS');

    return gulp
        .src('./src/client/css/site.less')
        .pipe($.plumber()) // exit gracefully if something fails after this
        .pipe($.less())
//        .on('error', errorLogger) // more verbose and dupe output. requires emit.
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./src/client/css/'));
});


/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-css', function(done) {
    var files = ['./src/client/css/site.css'];
    clean(files, done);
});

gulp.task('watch-less', function () {
    gulp.watch('./src/client/css/*.less', ['css']);
});

/**
 * Copy fonts
 * @return {Stream}
 */
//gulp.task('fonts', ['clean-fonts'], function() {
//    log('Copying fonts');
//
//    return gulp
//        .src(config.fonts)
//        .pipe(gulp.dest(config.build + 'fonts'));
//});

/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */
//gulp.task('build', ['optimize', 'images', 'fonts'], function() {
//    log('Building everything');
//
//    var msg = {
//        title: 'gulp build',
//        subtitle: 'Deployed to the build folder',
//        message: 'Running `gulp serve-build`'
//    };
//    del(config.temp);
//    log(msg);
//    notify(msg);
//});


/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
//gulp.task('optimize', ['inject', 'test'], function() {
//    log('Optimizing the js, css, and html');
//
//    var assets = $.useref.assets({searchPath: './'});
//    // Filters are named for the gulp-useref path
//    var cssFilter = $.filter('**/*.css');
//    var jsAppFilter = $.filter('**/' + config.optimized.app);
//    var jslibFilter = $.filter('**/' + config.optimized.lib);
//
//    var templateCache = config.temp + config.templateCache.file;
//
//    return gulp
//        .src(config.index)
//        .pipe($.plumber())
//        .pipe(inject(templateCache, 'templates'))
//        .pipe(assets) // Gather all assets from the html with useref
//        // Get the css
//        .pipe(cssFilter)
//        .pipe($.csso())
//        .pipe(cssFilter.restore())
//        // Get the custom javascript
//        .pipe(jsAppFilter)
//        .pipe($.ngAnnotate({add: true}))
//        .pipe($.uglify())
//        .pipe(getHeader())
//        .pipe(jsAppFilter.restore())
//        // Get the vendor javascript
//        .pipe(jslibFilter)
//        .pipe($.uglify()) // another option is to override wiredep to use min files
//        .pipe(jslibFilter.restore())
//        // Take inventory of the file names for future rev numbers
//        .pipe($.rev())
//        // Apply the concat and file replacement with useref
//        .pipe(assets.restore())
//        .pipe($.useref())
//        // Replace the file names in the html with rev numbers
//        .pipe($.revReplace())
//        .pipe(gulp.dest(config.build));
//});


/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
//gulp.task('clean', function(done) {
//    var delconfig = [].concat(config.build, config.temp, config.report);
//    log('Cleaning: ' + $.util.colors.blue(delconfig));
//    del(delconfig, done);
//});

/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
//gulp.task('clean-fonts', function(done) {
//    clean(config.build + 'fonts/**/*.*', done);
//});


/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
//gulp.task('clean-images', function(done) {
//    clean(config.build + 'images/**/*.*', done);
//});

/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
//gulp.task('clean-styles', function(done) {
//    var files = [].concat(
//        config.temp + '**/*.css',
//        config.build + 'styles/**/*.css'
//    );
//    clean(files, done);
//});

/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */
//gulp.task('clean-code', function(done) {
//    var files = [].concat(
//        config.temp + '**/*.js',
//        config.build + 'js/**/*.js',
//        config.build + '**/*.html'
//    );
//    clean(files, done);
//});
//

/////////////////
/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    console.log('Cleaning: ' + path);
    del(path, done);
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
//function clean(path, done) {
//    log('Cleaning: ' + $.util.colors.blue(path));
//    del(path, done);
//}

/**
 * Log an error message and emit the end of a task
 */
//function errorLogger(error) {
//    log('*** Start of Error ***');
//    log(error);
//    log('*** End of Error ***');
//    this.emit('end');
//}
