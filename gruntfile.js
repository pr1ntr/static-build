module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            dist: {
                options: {
                    paths: ['src/stylus'],
                    define: {"cdn_root" : "<%= pkg.deploy.prod.cdn_root %>"},
                    use: [
                        
                    ],
                    import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
                      
                    ]
                },
                files: {
                    'dev/css/<%= pkg.name %>.css': 'src/stylus/index.styl', // 1:1 compile
                    'dist/css/<%= pkg.name %>.css': 'src/stylus/index.styl' // 1:1 compile
                }
            },
            dev: {
                options: {
                    paths: ['src/stylus'],
                    define: {"cdn_root" : "<%= pkg.deploy.dev.cdn_root %>"},
                    use: [
                        
                    ],
                    import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
                      
                    ]
                },
                files: {
                    'dev/css/<%= pkg.name %>.css': 'src/stylus/index.styl', // 1:1 compile
                    'dist/css/<%= pkg.name %>.css': 'src/stylus/index.styl' // 1:1 compile
                }
            }
       
        },
        template: {
            dev: {
                engine: 'ejs',
                cwd: 'src/html/',
                data: "package.json",
                options: {
                    debug:true,
                    suffix:"",
                    cdn_root: "<%= pkg.deploy.dev.cdn_root %>"
                },
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'src/html/',      // Src matches are relative to this path.
                        src: '*.html', // Actual pattern(s) to match.
                        dest: 'dev/',   // Destination path prefix.
                        ext: '.html'  // Dest filepaths will have this extension.
                    }
                ]
            },
            dist: {
                engine: 'ejs',
                cwd: 'src/html/',
                data: 'package.json',
                options: {
                    debug:false,
                    suffix:"min.",
                    cdn_root: "<%= pkg.deploy.prod.cdn_root %>"
                }, 
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'src/html/',      // Src matches are relative to this path.
                        src: '*.html', // Actual pattern(s) to match.
                        dest: 'dist/',   // Destination path prefix.
                        ext: '.html'  // Dest filepaths will have this extension.
                    }
                ]
            }
        },

        cssmin: {
          add_banner: {
            options: {
              banner: '/* minified vendor css file */'
            },
            files: {
              'dist/css/<%= pkg.name %>-vendors-min.css': ['dev/css/<%= pkg.name %>-vendors.css']
            }
          }
        },
        bower: {
          dev: {
            dest: 'src/vendor',
            js_dest: 'src/vendor/js',
            css_dest: 'src/vendor/css'
          }
        },

        concat: {
          options: {
            // define a string to put between each file in the concatenated output
            separator: ';'
          },
          
          dev: {
            // the files to concatenate
            files: {
                'dev/js/<%= pkg.name %>.js' : [
                   
                    'src/js/base.js',
                    'src/js/**/*.js'
                ],
                'dev/js/<%= pkg.name %>-vendors.js' : [
                    'src/vendor/js/**/*.js'
                ],
                'dev/css/<%= pkg.name %>-vendors.css' : [
                    'src/vendor/css/**/*.css'
                ]
            }
          }
        },
        uglify: {
            options: {
            // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['dev/js/<%= pkg.name %>.js'],
                    'dist/js/<%= pkg.name %>-vendors.min.js': ['dev/js/<%= pkg.name %>-vendors.js']
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/js/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
            // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        watch: {
            js : {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint' , 'concat' ]
            },
            css : {
                files: ['<%= stylus.dev.options.paths +"/**/*.styl" %>'],
                tasks: ['stylus:dev' ]
            },
            images : {
                files: ['src/images/**/*.*'],
                tasks: ['copy:dev']
            },
            template: {
                files : ['<%= template.dev.cwd %>**/*.html'],
                tasks : ['template:dev']
            }
            
        },
        copy: {
            dev: {
                files: [
                    {
                        expand:true,
                        cwd: "src/images/",
                        src: ["**"],
                        dest: "dev/images/",
                        filter: 'isFile'
                    }

                ]
            }
        },  
        imagemin: {
            dist: {
                files: [
                    {
                        // Set to true to enable the following options…
                        expand: true,
                        // cwd is 'current working directory'
                        cwd: 'src/images/',
                        src: ['**/*.{png,jpg}'],
                        dest: 'dist/images/'
                    }
                ]
            }
        },
        connect: {
            dev: {
                options: {
                    port:3001,
                    base: "./dev"

                }
            },
            dist: {
                options: {
                    port:3001,
                    base: "./dist"

                }
            }

        }

    });
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-template-html');
    grunt.loadNpmTasks('grunt-bower');

    grunt.loadNpmTasks('grunt-contrib-connect');

    
    grunt.registerTask('setup', ['bower' , 'dev']);
    grunt.registerTask('deploy', ['bower' , 'dist']);

    grunt.registerTask('default', ['jshint', 'concat','stylus:dev', 'template:dev' , 'newer:copy:dev', 'watch',  'connect:dev' ]);
    grunt.registerTask('dev', ['default']);
    grunt.registerTask('dist', ['jshint', 'concat', 'uglify' , 'stylus', 'cssmin' ,'template:dist' , 'newer:imagemin:dist']);
    grunt.registerTask('dist:test', ['dist', "connect:dist:keepalive"]);
 
   
};
