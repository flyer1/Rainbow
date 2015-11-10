var runSequence = require('run-sequence');
var inject = require('gulp-inject');

module.exports = function (gulp, plugin, help, utils) {

    help.registerHelp('dist', {
        description: 'Copies over the js/html/css files to the dist folder. The files are bundled, minified and have cache busting in place, ready to be uploaded to public servers',
        primary: true
    });

    gulp.task('dist', ['clean'], function (done) {

        utils.logMsg('Starting distrubtion task...');
        runSequence('dist-template-cache', ['dist-main', 'dist-img', 'dist-fonts'], done);
       
    });

    gulp.task('dist-main', function () {
        
        utils.logMsg('Gathering groups of files from index.html and combining and optimizing them.');
        /* 
         * A note about useref: it p*sses me off b/c it's so core for this type of task and the documentation is so poor. That and the names used for the methods don't tell you much about what they do.
         * Gulp wraps it here: https://www.npmjs.com/package/gulp-useref
         * The original node code is here: https://www.npmjs.com/package/node-useref
         * Checking out the source code on github is one of the main methods on how to figure it out. 
         * That and John Papa's course on Pluralsight (paid subscription) at: https://app.pluralsight.com/library/courses/javascript-build-automation-gulpjs/table-of-contents
         * This code is strongly based upon his code on github here (the 'optimize' task): https://github.com/johnpapa/gulp-patterns/blob/master/gulpfile.js
         * 
         * To summarize: 
         * 
         * Step 1 (marked below): The call to useref.assets() will read the HTML comments in index.html. It'll find comments like '<!-- build:js js/lib.js -->' and then find all of the files until it hits the endbuild comment.
         *                        It'll concatenate those files into 1 file called lib.js for example (using the above HTML comment) and put it in the js folder of the root (the root determined by gulp.dest at the end of the pipeline).
         * 
         * Step 2 (marked below): Process the collection of files in step 1 in various ways. Use filters to focus on one group of files at a time.
         * 
         * Step 3 (marked below): The call to useref() (really? how does this tell what it does by this naming?) will update the index.html file and replace all of the file references with a new reference to js/lib.js, in this example.
         *                        It'll repeat this process for all 'build' comments it finds in the html file.
         * 
         * That is the main meat of this task. The additional processing going on here is using rev and rev-replace to cache bust the files by appending a content hash onto the names of the files (so lib.js becomes lib_938kdd98.js for eg).
         * As the content changes over time, so does the name of the file, therefore avoiding issues with the client's browser caching old versions of the js/css files.
         * 
         * And another thing going on is injecting the angular templates into the template cache.
        */

        // Useref will gather all of the files from the HTML comments in index.html in Step 1 below 
        var assets = plugin.useref.assets({ searchPath: './' });

        // Filters are named for the gulp-useref path
        var cssFilter = plugin.filter('**/*.css', { restore: true });
        var jsAppFilter = plugin.filter('**/app.js', { restore: true });
        var jslibFilter = plugin.filter('**/lib.js', { restore: true });
        var templateFile = gulp.src('./tmp/templates.js', { read: false });

        return gulp
            // READ INDEX.HTML FILE --------------
            .src('./src/client/index2.html')
            .pipe(plugin.plumber()) // Provide better error messaging
            .pipe(plugin.inject(templateFile))
            .pipe(plugin.print(utils.logFileProgress))

            // STEP 1 - Gather assets 
            .pipe(assets) //  Will change the pipeline of files to now be everything it found in the HTML comments in the index.html file

            // STEP 2 - process the list of files found within the Build HTML Comments
            // Process CSS Files --------------
            .pipe(cssFilter)
            .pipe(plugin.print(utils.logFileProgress))
            .pipe(plugin.csso())
            .pipe(cssFilter.restore)        // Clear the cssFilter

            // Process Custom JavaScript Files --------------
            .pipe(jsAppFilter)              // Filter the pipeline to just JS files so we can do stuff with them.
            .pipe(plugin.print(utils.logFileProgress))
            //.pipe(plugin.uglify())
            .pipe(getHeader())
            .pipe(jsAppFilter.restore)      // Clear the jsAppFilter

             // Process Vendor JavaScript Files --------
            .pipe(jslibFilter)
            .pipe(plugin.print(utils.logFileProgress))
            .pipe(plugin.uglify())          // another option is to override wiredep to use min files
            .pipe(jslibFilter.restore)      // Clear the jsLibFilter

            // Look at the files in the pipeline and add a hash onto the end of their name, according to their content (a content hash).
            .pipe(plugin.rev())
            .pipe(plugin.print(utils.logFileProgress))
            // Because we changed the contents of the stream above to be a bunch of files (found in index.html), restore the stream back to the original src, which is index.html
            .pipe(assets.restore())

            // STEP 3 
            .pipe(plugin.useref()) // Updates the index.html file with references to the new files.
            // Replace the file names in the html with updated names done by rev() above.
            .pipe(plugin.revReplace())

            // Write out the new ./dist/index.html file
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('dist-template-cache', function () {
        utils.logMsg('Creating an AngularJS $templateCache from the apps html files...');

        return gulp
            .src(['./src/client/**/*.html', '!./src/client/lib/**'])
            .pipe(plugin.minifyHtml({ empty: true }))
            .pipe(plugin.angularTemplatecache(
                'templates.js',
                {
                    module: 'app',
                    root: '/',
                    standAlone: true
                }
            ))
            .pipe(gulp.dest('./tmp'));
    });

    gulp.task('dist-img', function () {
        utils.logMsg('Copying images to dist folder');

        return gulp
            .src(['./src/client/img/*', '!./src/client/img/resources'])
            .pipe(gulp.dest('./dist/img'));
    });

    gulp.task('dist-fonts', function () {
        utils.logMsg('Copying fonts to dist folder');

        return gulp
            .src(['./src/client/lib/font-awesome/fonts/*'])
            .pipe(gulp.dest('./dist/fonts'));
    });

    /////////////////// HELPER FUNCTIONS ////////////////////

    function getHeader() {
        var pkg = require('../package.json');
        var template = ['/**',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @authors <%= pkg.authors %>',
            ' * @version v<%= pkg.version %>',
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' */',
            ''
        ].join('\n');
        return plugin.header(template, {
            pkg: pkg
        });
    }
};

