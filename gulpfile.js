var gulp = require('gulp');
// GULP plug-in loader
var plugin = require('gulp-load-plugins')({ lazy: true });
// hard wire our configuration helper right onto the plugin so we can pass it around
plugin.rdcConfigHelper = require('./gulp-tasks/task-config.js')();
// Grab our help system to pass around to our external gulp tasks, so that they can register their own help
var help = require('./gulp-tasks/task-help.js')(gulp);

// get our config for use in all our tasks
var config = plugin.rdcConfigHelper.getConfig();

// All our custom tasks
require('./gulp-tasks/task-clean.js')(gulp, config, plugin, help);
require('./gulp-tasks/task-copy.js')(gulp, config, plugin, help);
require('./gulp-tasks/task-dist.js')(gulp, config, plugin, help);

gulp.task('default', ['help']);