module.exports = function(grunt) {

  var replaceToken= "<!-- /* BOOKMARCKLET.MIN.JS */ -->",
      fs= require('fs');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: ''
      },
      build: {
        src: 'bookmarklet.js',
        dest: 'bookmarklet.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['bookmarklet.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
    addLink: {
        data:{
          input: 'index.src.html',
          output: 'index.html',
          content: 'bookmarklet.min.js',
          token: replaceToken
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerMultiTask('addLink', 'Adds the minified bookmarklet js to the html.', function() {
    
    var jsToInsert= fs.readFileSync(this.data.content);
    var template= fs.readFileSync(this.data.input, 'utf8');
    template= template.replace(this.data.token, jsToInsert);
    fs.writeFileSync(this.data.output, template , 'utf8');
  });

  grunt.registerTask('default', ['uglify', 'addLink']);

};
