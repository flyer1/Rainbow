
var chalk = require('chalk');
var FONTS = require('cfonts');

module.exports = function (gulp) {

	var help = {};

	gulp.task('help', function (done) {
	    showHelp();
		done();
	});

	var service = {
		registerHelp: registerHelp,
		showHelp: showHelp
	};

	return service;

    ////////////////////////// IMPLEMENTATION ////////////////////////// 
	function registerHelp(name, helpData) {
	    help[name] = helpData;
	}

	function showHelp() {

	    banner();

	    dumpRegisteredHelp();
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

    function dumpRegisteredHelp() {
        var col1Width = 15;

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