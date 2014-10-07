'use strict';

module.exports = function(grunt) {
  
  var polyfillFiles = [
    'src/bootstrap.js',

    'lib/WeakMap/weakmap.js',
    'lib/MutationObservers/MutationObserver.js',
    'lib/HTMLImports/src/scope.js',
    'lib/HTMLImports/src/base.js',
    'lib/HTMLImports/src/Loader.js',
    'lib/HTMLImports/src/Parser.js',
    'lib/HTMLImports/src/HTMLImports.js',
    'lib/HTMLImports/src/Observer.js',
    'lib/HTMLImports/src/boot.js',

    'src/register.js'
  ];

  grunt.initConfig({
    concat: {
      polyfills: {
        src: polyfillFiles,
        dest: 'dist/bosonic-runtime.js'
      }
    },

    connect: {
      test: {
        options: {
          port: 8020,
          base: ['dist', 'node_modules', 'test'],
          hostname: '*'
        }
      }
    },

    watch: {
      polyfills: {
        files: ['src/*.js'],
        tasks: ['concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'connect', 'watch']);

};