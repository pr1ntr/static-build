module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            compile: {
                options: {
                    paths: ['src/stylus'],
                    define: {"cdn_root" : "<%= pkg.deploy.cdn_root %>"},
                    use: [
                        
                    ],
                    import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
                      
                    ]
                },
                files: {
                    'dev/css/<%= pkg.name %>.css': 'src/stylus/index.styl', // 1:1 compile
                    'dist/css/<%= pkg.name %>.css': 'src/stylus/index.styl', // 1:1 compile
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
                    suffix:""
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
                    suffix:"min."
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
            }, 
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
                    'dist/js/<%= pkg.name %>-vendors.min.js': ['dev/js/<%= pkg.name %>-vendors.js'],
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/js/**/*.js','server.js' ],
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
            files: ['<%= jshint.files %>' ,  '<%= stylus.compile.options.paths +"/**/*.styl" %>'],
            tasks: ['jshint' , 'concat' , 'stylus'  , 'template:dev']
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-template-html');
    grunt.loadNpmTasks('grunt-bower');

    grunt.loadNpmTasks('grunt-contrib-connect');

  

    grunt.registerTask('default', ['jshint', 'concat','stylus', 'template:dev' , 'connect:dev' , 'watch']);
    grunt.registerTask('dev', ['jshint', 'concat','stylus', 'template:dev' , 'connect:dev' , 'watch']);
    grunt.registerTask('dist', ['jshint', 'concat', 'uglify' , 'stylus', 'cssmin' ,'template:dist' ]);
    grunt.registerTask('dist:test', ['jshint', 'concat', 'uglify' , 'stylus', 'cssmin' ,'template:dist' , "connect:dist"]);
    grunt.registerTask('bower-init', ['bower' ]);
  
   
};