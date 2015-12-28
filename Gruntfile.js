
module.exports = function(grunt) {
 
    // load all grunt tasks
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            app: {
                files: [
                    'app/**/*.hbs',
                    'app/js/*.js'
                ],
                tasks: ['assemble']
            }
        },
        assemble: {
            options:{
                helpers: ['helper-moment', 'app/js/helpers.js'],
		plugins: ['grunt-assemble-sitemap'],
                layoutdir: 'app/layouts',
                flatten: true,
                layout: 'default.hbs',
                partials: 'app/partials/**/*.hbs',
                assets: 'dist',
                collections: [
                    {
                        name: 'post',
                        sortby: 'posted',
                        sortorder: 'descending'
                    }
                ],
		sitemap: {
			homepage: 'http://blog.kulinarian.com',
			dest: 'dist',
			relativedest: true
		}
            },
            posts: {
                files: {
                    'dist/index.html': ['app/content/posts/index.hbs'],
                    'dist/posts/2015/': ['app/content/posts/2015/**/*.hbs']
                }
            }
        }
    };

    /**
     * I moved all of the config items out of grunt.initConfig()
     * this way we can add stuff dynamically,
     */
    grunt.initConfig(gruntConfig); 

    //grunt tasks
    grunt.registerTask('build', ['watch']);
};
