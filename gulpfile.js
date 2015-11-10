var gulp = require('gulp');
// GULP plug-in loader
var plugin = require('gulp-load-plugins')({ lazy: true });

// hard wire our helpers right onto the plugin so we can pass it around
//plugin.rdcConfigHelper = require('./gulp-tasks/task-config.js')();
plugin.rdcUtils = require('./gulp-tasks/utils.js')();

// Grab our help system to pass around to our external gulp tasks, so that they can register their own help
var help = require('./gulp-tasks/task-help.js')(gulp);

// get our config for use in all our tasks
//var config = plugin.rdcConfigHelper.getConfig();
var utils = plugin.rdcUtils.getUtils(plugin);

// All our custom tasks
require('./gulp-tasks/task-dist.js')(gulp, plugin, help, utils);
require('./gulp-tasks/task-serve.js')(gulp, plugin, help, utils);
require('./gulp-tasks/task-clean.js')(gulp, plugin, help, utils);
require('./gulp-tasks/task-css.js')(gulp, plugin, help, utils);

gulp.task('default', ['help']);


