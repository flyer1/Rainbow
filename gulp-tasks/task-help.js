
var chalk = require('chalk');
var FONTS = require('cfonts');

module.exports = function (gulp) {

	var help = {};

	gulp.task('help', function (done) {
		printAllHelp();
		done();
	});

	var service = {
		registerHelp: registerHelp,
		printAllHelp: printAllHelp,
		printHelp: printHelp
	};

	return service;

    ////////////////////////// IMPLEMENTATION ////////////////////////// 
	function registerHelp(name, helpData) {
	    help[name] = helpData;
	}

	function printAllHelp() {

	    var maxCol = 120;
	    var col1Width = 15;

	    banner();

	    var keys = Object.keys(help),
                   i, len = keys.length;
	    keys.sort();

	    for (i = 0; i < len; i++) {
	        var taskHelp = help[keys[i]];
	        var dotWidth = col1Width - keys[i].length;
	        w(chalk.green.bold('   ' + keys[i] + '  '));
	        w(chalk.gray.bold(pad('', dotWidth, '.')));
	        w(' ');
	        wl(chalk.bold(taskHelp.description));
	    }

	    wl('');
	    wl('');
	}

	function banner() {
	    var fonts = new FONTS({
	        'text': 'Rainbow Tasks', //text to be converted 
	        'font': 'block', //define the font face 
	        'colors': ['magenta','red'], //define all colors 
	        'background': 'Black', //define the background color 
	        'letterSpacing': 1, //define letter spacing 
	        'space': true, //define if the output text should have empty lines on top and on the bottom 
	        'maxLength': '15' //define how many character can be on one line 
	    });

	    wl('Usage: gulp taskname [args]');
	    wl('===========================');
	    wl('');
	    wl('Available tasks:');
	    wl('');
	}

	function printHelp(taskName) {

	    banner();

		var maxCol = 120,
			option,
			task;

		task = help[taskName];
		wl(chalk.green.bold(pad(task.name + ' Help ', maxCol)));

		wl(chalk.bold(task.description));

		if (task.options && task.options.length > 0) {
		    wl(chalk.yellow.bold(pad('Options ', maxCol)));
			for (var i = 0; i < task.options.length; i++) {
				option = task.options[i];

				w('     ' + chalk.green.bold(option.name));
				w(pad('  ', 40 - option.name.length - 5, '.'));
				wl(chalk.bold(option.description));
			}
		}

		wl(chalk.green.bold(pad('', maxCol)));
	}


	function w(s) {
		process.stdout.write(s);
	}

	function wl(s) {
		process.stdout.write(s + '\n');
	}

	function pad(s, l, c) {
		while (s.length < l) s += c || '-';
		return s;
	}
};