'use strict';

module.exports = function (grunt) {

    var files = {
            jade: 'templates/jade/*.jade',
            less: 'templates/less/*.less',
            css: 'css/*.css',
            js: 'js/*.js'
        },
        libCss = [
            'lib/pure/css/pure-min.css',
            'lib/pure/css/grids-responsive-min.css',
            'lib/font-awesome/css/font-awesome.min.css'
        ]

    grunt.initConfig({
        watch: {
            jade: {
                files: files.jade,
                tasks: ['html']
            },
            less: {
                files: files.less,
                tasks: ['css']
            },
            js: {
                files: files.js,
                tasks: ['js']
            }
        },
        jshint: {
            all: {
                src: files.js,
                options: {
                    jshintrc: true
                }
            }
        },
        concat: {
            js: {
                files: {
                    'dist/app.js': files.js
                }
            },
            css: {
                files: {
                    'dist/app.css': libCss.concat(files.css)
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/app.min.js': 'dist/app.js'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: require('./jade.compile.template')
                },
                files: [{
                    expand: true,
                    cwd: 'templates/jade/',
                    src: ['*.page.jade'],
                    dest: 'dist/',
                    ext: '.html'
                }]
            }
        },
        less: {
            compile: {
                files: [{
                    expand: true,
                    cwd: 'templates/less/',
                    src: ['*.less'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        copy: {
            assets: {
                files: [{
                    expand: true,
                    cwd: 'lib/font-awesome/fonts/',
                    src: ['**'],
                    dest: 'dist/'
                }, {
                    expand: true,
                    cwd: 'images/',
                    src: ['**'],
                    dest: 'dist/'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.option('force', true);

    grunt.registerTask('html', ['jade']);
    grunt.registerTask('js', ['jshint', 'concat:js', 'uglify']);
    grunt.registerTask('css', ['less', 'concat:css']);

    grunt.registerTask('default', ['html', 'js', 'css', 'copy:assets', 'watch']);
};
