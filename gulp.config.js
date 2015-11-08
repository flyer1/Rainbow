module.exports = function () {
    var root = './';
    var client = './src/client/';
    var clientApp = client + 'js/';
    //var wiredep = require('wiredep');
    //var bowerFiles = wiredep({ devDependencies: true })['js'];
    var bower = {
        json: require('./bower.json'),
        directory: client + 'lib/',
        ignorePath: '../..'
    };
    var nodeModules = 'node_modules';

    var config = {
        /**
         * File paths
         */
        // all javascript that we want to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/',
        client: client,
        css: 'styles.css',
        fonts: bower.directory + 'font-awesome/fonts/**/*.*',
        html: client + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        // app js, with no specs
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        less: client + 'styles/styles.less',
        root: root,
        source: 'src/',

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: 'app/',
                standAlone: false
            }
        },

        /**
         * Bower and NPM files
         */
        bower: bower,
        packages: [
            './package.json',
            './bower.json'
        ]
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;

};