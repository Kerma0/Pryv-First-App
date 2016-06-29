/**
 * Created by kerma on 6/22/16.
 */

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      main: {
        src: ['./src/*.js'],
        dest: 'dist/script/firstapp.js',
        options: {
          alias: ['./src/app.js:FIRSTapp']
        }
      }
    },
    concat: {
      dist: {
        src: ['src/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    copy: {
      media : {
        files: [
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: ['src/*.js', 'src/index.html', 'src/style.css'],
            dest: 'dist/'
          }
        ]
      }
    },
    watch: {
      all: {
        files: ['src/*.js', 'src/index.html', 'src/style.css'],
        tasks: ['jshint', 'browserify', 'concat', 'copy']
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['jshint', 'browserify', 'concat', 'copy']);
};