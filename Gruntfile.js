module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            options: {
                require: ['should', 'co-mocha'],
                reporter: 'spec',
                'harmony-generators': true,
                bail: false
            },
            all: ['test/**/*tests.js']
        },
        jsbeautifier: {
            files: [
                '*.js',
                'examples/**/*.js',
                'src/**/*.js',
                'test/**/*.js',
                '!.git/**/*'
            ],
            options: {
                js: {
                    jslintHappy: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            uses_defaults: [
                '*.js',
                'examples/**/*.js',
                'src/**/*.js',
                'test/**/*.js'
            ]
        },
        babel: {
            dist: {
                files: {
                    'lib/models.js': 'src/models.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-mocha-cli');

    grunt.registerTask('forceEnv', 'Force set the node env', function (setEnv) {
        grunt.log.writeln('Force setting environment to ' + setEnv);
        process.env.NODE_ENV = setEnv;
    });
    grunt.registerTask('test', ['babel', 'forceEnv:test', 'mochacli:all']);

    grunt.registerTask('build', ['babel', 'jsbeautifier', 'jshint']);
};
