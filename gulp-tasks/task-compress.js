module.exports = function (gulp, config, plugin, help) {

    help.registerHelp('compress', {
        name: 'TODO',
        description: 'COmpress TODO.'
    });

    var minOptions = { keepSpecialComments: 0 };

    gulp.task('compress', function (done) {
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