var del = require('del');

module.exports = function (gulp, plugin, help, utils) {

    help.registerHelp('clean', {
        isInternalTask: true,
        description: 'Wipes out the dist & tmp folders'
    });

    gulp.task('clean', function () {
        plugin.util.log('Cleaning: ' + plugin.util.colors.gray('./dist/') + ' & ' + plugin.util.colors.gray('./tmp'));
        return del(['./dist/**', './tmp/**']);
    });
};