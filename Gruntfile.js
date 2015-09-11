module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      server: {
        src: ['server/**/*.js'],
        options: {
          'node': true,
          'esnext': true,
          'bitwise': true,
          'camelcase': true,
          'curly': true,
          'eqeqeq': true,
          'immed': true,
          'indent': 2,
          'latedef': true,
          'newcap': true,
          'noarg': true,
          'regexp': true,
          'undef': true,
          'unused': 'vars',
          'trailing': true,
          'smarttabs': true,
          'white': true
        }
      },
      client: {
        src: ['client/**/*.js', '!client/lib/**/*.js'],
        options: {
          'esnext': true,
          'bitwise': true,
          'camelcase': true,
          'curly': true,
          'eqeqeq': true,
          'immed': true,
          'indent': 2,
          'latedef': true,
          'newcap': true,
          'noarg': true,
          'regexp': true,
          'undef': true,
          'unused': 'vars',
          'trailing': true,
          'smarttabs': true,
          'white': true,
          // remove for production - allows console.log, etc
          'devel': true,
          globals: {
            'angular': false,
            '_': false
          }
        }
      },
    },
    mochaTest: {
      src: ['test/server/**/*.js']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['jshint', 'mochaTest', 'karma']);
  grunt.registerTask('default', ['test']);
};
