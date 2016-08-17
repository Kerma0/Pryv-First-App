/**
 * Created by kerma on 6/22/16.
 */

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: require('./package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    browserify: {
      dist: {
        src: ['./src/**/*.js'],
        dest: 'dist/script/example-app.js',
        options: {
          alias: ['./src/js/app.js:example-app']
        }
      }
    },

    copy: {
      all: {
        files: [
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: ['src/html/index.html', 'src/css/style.css'],
            dest: 'dist/'
          }
        ]
      },
      tinylib: {
        files: [
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: ['src/js/function.js'],
            dest: 'tinylib/'
          }
        ]
      }
    },

    watch: {
      all: {
        files: ['Gruntfile.js', 'src/**/*.*'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'browserify', 'copy']);
};