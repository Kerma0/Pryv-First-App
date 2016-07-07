/**
 * Created by kerma on 6/22/16.
 */

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: require('./package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/*.test.js'],
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
      },
      test: {
        src: ['./test/*.test.js'],
        dest: 'test/script/full-test.js',
        options: {
          alias: ['./test/main.test.js:full-test.js']
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
      test: {
        files: [
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: [
              'node_modules/mocha/mocha.js',
              'node_modules/mocha/mocha.css',
              'node_modules/chai/chai.js'
            ],
            dest: 'test/vendor'
          }
        ]
      }
    },

    watch: {
      all: {
        files: [
          'Gruntfile.js',
          'src/**/*.*',
          'test/*.*'
        ],
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