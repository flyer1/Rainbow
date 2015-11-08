var runSequence = require('run-sequence');

module.exports = function (gulp, config, plugin, help) {

    help.registerHelp('dist', {
        name: 'Main distribution task.',
        description: 'Cleans, compresses & copies the website over to the dist folder. You can then upload it to public servers.',
        primary: true
    });


    gulp.task('rebuild', function (done) {
        runSequence('clean', ['compress', 'copy'], done);
    });

};