module.exports = function(grunt){
  // Do grunt-related things in here
    
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      
        uglify:{
            my_target:{
                files:{
                    'public/app.min.js' : ['public/app.js']
                }
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
};