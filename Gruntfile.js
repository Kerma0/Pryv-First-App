/* global module, require */

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
        src: ['./src/js/**/*.js'],
        dest: 'dist/script/scriptBrowserify.js',
        options: {
          alias: ['./src/js/script.js:scriptBrowserify']
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
            src: ['src/html/index.html'],
            dest: 'dist/'
          },
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: ['src/css/*.css'],
            dest: 'dist/css'
          }
        ]
      }
    },

    buildGhPages: {
      ghPages: {}
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-build-gh-pages');

  grunt.registerTask('default', ['jshint', 'browserify', 'copy']);
  grunt.registerTask('gh-pages', ['buildGhPages']);
};