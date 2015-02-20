var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Compile less to css
 * @return {Stream}
 */
gulp.task('styles', ['clean-styles'], function() {
    console.log('Compiling Less --> CSS');

    return gulp
        .src('./src/client/css/site.less')
        //.pipe($.plumber()) // exit gracefully if something fails after this
        .pipe($.less())
//        .on('error', errorLogger) // more verbose and dupe output. requires emit.
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./src/client/css/'));
});


/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
    var files = [].concat(
        './src/client/css/site.css'
    );
    clean(files, done);
});



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