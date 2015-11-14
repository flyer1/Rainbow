var _ = require('underscore');
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
            'colors': ['magenta', 'red'], //define all colors 
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

        var keys = Object.keys(help);
        var i;
        var len = keys.length;

        keys.sort();

        for (i = 0; i < len; i++) {
            var taskHelp = help[keys[i]];
            var dotWidth = col1Width - keys[i].length;
            w(chalk.green.bold('   ' + keys[i] + '  '));
            w(chalk.gray.bold(pad('', dotWidth, '.')));
            w(' ');
            var lines = sliceString(taskHelp.description);
            _.forEach(lines, function (description) {
                wl(chalk.bold(description));
            });
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

    // Slice up a string into pieces of approximately LINE_LENGTH in size (breaks on word boundaries)
    function sliceString(s) {
        var result = [];
        var LINE_LENGTH = 60;
        var startIndex = 0;
        var endIndex = LINE_LENGTH;
        var spacer = '';
        do {
            endIndex = findWordBreak(s, endIndex);
            result.push(spacer + s.substring(startIndex, endIndex));
            startIndex = endIndex;
            endIndex += LINE_LENGTH;
            spacer = '                    ';
        } while (startIndex < s.length)
        return result;
    }

    // Find a word break or the end of string, whichever comes first
    function findWordBreak(s, index) {
        var len = s.length;
        var result = len;

        if (index <= len) {
            for (var i = index; i < len; i++) {
                if (s[i] === ' ') {
                    result = i;
                    break;
                }
            }
        }
        return result;
    }

};