module.exports = function (gulp, config, plugin, help) {

    help.registerHelp('css', {
        name: 'Build app CSS',
        description: 'Builds our app CSS code into a single app.min.css file;  also creates a source map for the CSS.'
    });

    var minOptions = { keepSpecialComments: 0 };

    gulp.task('css', function (done) {
        gulp.src(config.paths.src.css)
            .pipe(plugin.concat('app.css'))
            .pipe(plugin.sourcemaps.init({ loadMaps: true }))
            .pipe(plugin.if(config.minify, plugin.minifyCss(minOptions))) // only minify if we are doing a BUILD
            .pipe(plugin.rename({ extname: '.min.css' }))
            .pipe(plugin.sourcemaps.write('../maps'))
            .pipe(gulp.dest(config.paths.dest.css))
            .on('end', done);
    });
};