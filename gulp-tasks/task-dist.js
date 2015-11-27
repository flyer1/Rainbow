var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var gulpIf = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var plumber = require('gulp-plumber');
var useref = require('gulp-useref');

module.exports = function (gulp, plugin, help, utils) {

    help.registerHelp('dist', {
        description: 'Copies over the js/html/css files to the dist folder. The files are bundled, minified and have cache busting in place, ready to be uploaded to public servers',
    });

    /******** TASK ********/
    gulp.task('dist', ['clean'], function (done) {

        utils.logMsg('Starting distrubtion task...');
        runSequence('dist-template-cache', ['dist-main', 'dist-img', 'dist-fonts', 'dist-data'], 'clean-tmp', done);

    });

    /******** TASK ********/
    gulp.task('dist-main', function () {

        utils.logMsg('Gathering groups of files from index.html and combining and optimizing them.');

        var templateFile = gulp.src('./tmp/templates.js', { read: false });

        return gulp
            // READ INDEX.HTML FILE --------------
            .src('./src/client/index2.html')
            .pipe(plumber()) // Provide better error messaging

            .pipe(plugin.print(utils.logFileProgress))

            // Inject the angular template cache file (all of the html files are written to a tmp js file that puts these files into the angular template cache. 
            // TLDR; *.html files are transformed into 1 *.js file and are now loaded from the template cache
            .pipe(inject(templateFile, { relative: true }))

            // Read the index.html file - parse the HTML comments for 'build' tags - group the files together (4 groups in total) and concatenate together.
            .pipe(useref({ searchPath: './src/client/' })) //  Will change the pipeline of files to now be everything it found in the HTML comments in the index.html file

            // Process CSS Files --------------
            .pipe(gulpIf('*.css', plugin.csso()))

            // Process JavaScript Files --------------
            .pipe(gulpIf('*.js', getHeader()))
            //.pipe(gulpIf('*.js', plugin.uglify()))          

            // Look at the files in the pipeline and add a hash onto the end of their name, according to their content (a content hash).
            .pipe(gulpIf('!*.html', rev()))

            // Replace the file names in the html with updated names done by rev() above.
            .pipe(revReplace())

            // Write out the new ./dist/index.html file
            .pipe(gulp.dest('./dist/'));
    });

    /******** TASK ********/
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

    /******** TASK ********/
    gulp.task('dist-img', function () {
        utils.logMsg('Copying images to dist folder');

        return gulp
            .src(['./src/client/img/**', '!./src/client/img/resources/**'])
            .pipe(gulp.dest('./dist/img'));
    });

    /******** TASK ********/
    gulp.task('dist-fonts', function () {
        utils.logMsg('Copying fonts to dist folder');

        return gulp
            .src(['./src/client/lib/font-awesome/fonts/*', './src/client/lib/flexslider/fonts/*', './src/client/lib/lightgallery/dist/fonts/*'])
            .pipe(gulp.dest('./dist/fonts'));
    });

    /******** TASK ********/
    gulp.task('dist-data', function () {
        utils.logMsg('Copying json data to dist folder');

        return gulp
            .src(['./src/client/data/*'])
            .pipe(gulp.dest('./dist/data'));
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

