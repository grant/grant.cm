//
// Note: All files are run through gulp. Gulp can run grunt tasks through gulp-grunt.
//
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		handlebars: {
			compile: {
				options: {
					commonjs: true,
					processName: function(filePath) {
						var pieces = filePath.split('/');
						pieces.shift();
						pieces.shift();
						var partialName = pieces.join('/');
						partialName = partialName.substring(0, partialName.lastIndexOf('.'));// Remove extension
						console.log('Compiled: ' + partialName);
						return partialName;
					}
				},
				files: {
					'private/js/templates.js': ['views/partials/cards/**/*.hbs']
				}
			}
		},

		watch: {
			hbs: {
				files: ['views/partials/cards/data/**/*.hbs'],
				tasks: ['handlebars']
			}
		}
	});

	grunt.registerTask('default', ['watch']);

	require('load-grunt-tasks')(grunt);
};