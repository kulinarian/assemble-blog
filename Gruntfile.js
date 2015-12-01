
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
                helpers: ['app/js/helpers.js'],
                layoutdir: 'app/layouts',
                flatten: true,
                layout: 'default.hbs',
                partials: 'app/partials/**/*.hbs',
                assets: 'dist'
            },
            page: {
                files: {
                    'dist/': ['app/content/page/*.hbs']
                }
            },
            blog: {
                files: {
                    'dist/': ['app/content/blog/*.hbs']
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