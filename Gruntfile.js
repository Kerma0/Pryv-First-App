/**
 * Created by kermai_q on 6/22/16.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                src: ['./src/app.js'],
                dest: 'dist/script/firstapp.js',
                options: {
                    alias: ['./src/app.js:FIRSTapp']
                  }
                }
              },
              concat: {
//Find what it means
                  options: {
                      stripBanners: true,
                      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                      '<%= grunt.template.today("yyyy-mm-dd") %> */'
                    },
//Find the depedencies required for the app
                    dist: {
                      src: ['src/**/*.js'],
                      dest: 'dist/<%= pkg.name %>.js'
                    }
                  },
                  copy: {
                      media : {
// Rename with the correct html file
                          files: [
                              {
                                expand: true,
                                flatten: true,
                                filter: 'isFile',
                                src: 'src/index.html',
                                dest: 'dist/'
                              }
                            ]
                          }
                        },
        // Verify the use of 'watch'
                        watch: {
                            all: {
                                files: ['src/**/*.*'],
                                tasks: ['browserify']
                              }
                            },
// Used to verify the code
                            jshint: {
                                files: ['Gruntfile.js', 'src/**/*.js'],
                                options: {
                                    ignores: ['src/vendor/*.js'],
                                    jshintrc: '.jshintrc'
                                  }
                                }
                              });
// Verify the correct chain for required use
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task.
    grunt.registerTask('default', ['jshint', 'browserify', 'concat', 'copy']);
  };