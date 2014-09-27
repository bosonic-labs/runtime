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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);

};