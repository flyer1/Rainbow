var del = require('del');

module.exports = function (gulp, config, plugin, help) {

    help.registerHelp('clean', {
        isInternalTask: true,
        description: 'Wipes out the dist & tmp folders'
    });

    gulp.task('clean', function (done) {
        plugin.util.log('Cleaning: ' + plugin.util.colors.gray(config.dist.root) + ' & ' + plugin.util.colors.gray('./tmp'));
        return del(['./dist/**', './tmp/**']);
    });
};