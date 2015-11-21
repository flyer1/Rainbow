var del = require('del');

module.exports = function (gulp, plugin, help, utils) {

    gulp.task('clean', function () {
        plugin.util.log('Cleaning: ' + plugin.util.colors.gray('./dist/') + ' & ' + plugin.util.colors.gray('./tmp'));
        return del(['./dist/**', './tmp/**']);
    });

    gulp.task('clean-tmp', function () {
        plugin.util.log('Cleaning: ' + plugin.util.colors.gray('./tmp'));
        return del('./tmp');
    });
};