'use strict()';


module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-githash'); // wtf


    var options = {
        config: {
            src: './grunt/*.js'
        },
        pkg: grunt.file.readJSON('package.json')
    };

    var configs = require('load-grunt-configs')(grunt, options);



    // Project configuration.
    grunt.initConfig(configs);


    // load jshint
    grunt.registerTask('images' , ['newer:imagemin']);

    grunt.registerTask('default' , ['dev']);
    grunt.registerTask('dev', [
        'clean',
        'githash',
        'jade',
        'sass:dev',
        'postcss:dev',
        'webpack:dev',
        'browserSync',
        'watch'
    ]);

    grunt.registerTask('build' , [
        'clean',
        'githash',
        'jade',
        'sass:prod',
        'postcss:prod',
        'autoprefixer',
        'webpack:prod',
        'images'
    ]);

};
