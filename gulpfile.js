var args = require('yargs').argv;
var gulp = require('gulp');
var del = require('del');
var plugin = require('gulp-load-plugins')({lazy: true});
var paths = {
    less: ['./src/client/css/site.less'],
    css: './src/client/css/'
};

/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp serve-dev
 *
 * --verbose  : Various tasks will produce more output to the console.
 * --nosync   : Don't launch the browser with browser-sync when serving code.
 * --debug    : Launch debugger with node-inspector.
 * --debug-brk: Launch debugger and break on 1st line with node-inspector.
 * --startServers: Will start servers for midway tests on the test task.
 */


/**********************************************************************************
 DEFAULT TASKS
 **********************************************************************************/
// Show a list of available tasks if the user doesn't provide a task name or if they
// ask for the help task ('gulp help')
gulp.task('default', ['help']);
gulp.task('help', plugin.taskListing);


/**********************************************************************************
 CSS RELATED TASKS
 **********************************************************************************/
// Compile the LESS files to app.css
gulp.task('css', ['clean-css'], function() {
    console.log('Compiling Less --> CSS');

    return gulp
        .src(['./src/client/css/site.less'])
        .pipe(plugin.plumber()) // exit gracefully if something fails after this
        .pipe(plugin.less())
        .pipe(plugin.autoprefixer())
        .pipe(gulp.dest('./src/client/css/'));
});

// Watch for changes to LESS files and recompile CSS when changes occur
gulp.task('watch-less', function () {
    gulp.watch('./src/client/css/*.less', ['css']);
});

// Remove existing css file
gulp.task('clean-css', function(done) {
    var files = [ './src/client/css/site.css'];
    clean(files, done);
});


/**********************************************************************************
 TESTING RELATED TASKS
 **********************************************************************************/
gulp.task('test', function() {
  // TODO:
  return true;
})


/**********************************************************************************
 DISTRIBUTION RELATED TASKS
 **********************************************************************************/
  /**
  * Build everything
  * This is separate so we can run tests on
  * optimize before handling image or fonts
  */
 gulp.task('build', ['optimize', 'images', 'fonts'], function() {
     log('Building everything');

     var msg = {
         title: 'gulp build',
         subtitle: 'Deployed to the build folder',
         message: 'Running `gulp serve-build`'
     };
     del(config.temp);
     log(msg);
     notify(msg);
 });


 /**
  * Optimize all files, move to a build folder,
  * and inject them into the new index.html
  * @return {Stream}
  */
 gulp.task('optimize', ['test'], function() {
     log('Optimizing the js, css, and html');


     var assets = plugin.useref.assets({searchPath: './'});
     // Filters are named for the gulp-useref path
     var cssFilter = plugin.filter('**/*.css');
     var jsAppFilter = plugin.filter('**/app.js' );
     var jslibFilter = plugin.filter('**/lib.js');

     //var templateCache = config.temp + config.templateCache.file;

     return gulp
         .src('./src/client/index.html')
         .pipe(plugin.plumber())
         //.pipe(inject(templateCache, 'templates'))
         .pipe(assets) // Gather all assets from the html with useref
         // Get the css
         .pipe(cssFilter)
         .pipe(plugin.csso())
         .pipe(cssFilter.restore())
         // Get the custom javascript
         .pipe(jsAppFilter)
         //.pipe($.ngAnnotate({add: true}))
         .pipe(plugin.uglify())
         //.pipe(getHeader())
         .pipe(jsAppFilter.restore())
         // Get the vendor javascript
         .pipe(jslibFilter)
         .pipe(plugin.uglify()) // another option is to override wiredep to use min files
         .pipe(jslibFilter.restore())
         // Take inventory of the file names for future rev numbers
         //.pipe($.rev())
         // Apply the concat and file replacement with useref
         .pipe(assets.restore())
         .pipe(plugin.useref())
         // Replace the file names in the html with rev numbers
         //.pipe($.revReplace())
         .pipe(gulp.dest('./dist/'));
 });

// Copy fonts to the Dist folder
gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');

    return gulp
        .src('./src/client/fonts/**')
        .pipe(gulp.dest('./dist/fonts/'));
});

// Copy images to the Dist folder
gulp.task('images', ['clean-images'], function() {
    log('Copying images');

    return gulp
        .src('./src/client/img/**')
        .pipe(gulp.dest('./dist/img/'));
});

/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp, config.report);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

// Remove all fonts from the dist folder
gulp.task('clean-fonts', function(done) {
    clean('./dist/fonts/**/*.*', done);
});

// Remove all images from the dist folder
gulp.task('clean-images', function(done) {
    clean('./dist/img/**/*.*', done);
});

// Remove all styles from the dist
gulp.task('clean-dist-css', function(done) {
    clean('./dist/css/**/*.css', done);
});

// Remove all js and html from the dist folder
gulp.task('clean-code', function(done) {
    var files = [].concat(
        './dist/js/**/*.js',
        './dist/**/*.html'
    );
    clean(files, done);
});

/////////////////////////////////////////// LOCAL FUNCTIONS //////////////////////////////
/*
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    console.log('Cleaning: ' + path);
    del(path, done);
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                plugin.util.log(plugin.util.colors.blue(msg[item]));
            }
        }
    } else {
       plugin.util.log(plugin.util.colors.blue(msg));
    }
}

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
// function inject(src, label, order) {
//     var options = {read: false};
//     if (label) {
//         options.name = 'inject:' + label;
//     }
//
//     return plugin.inject(orderSrc(src, order), options);
// }
