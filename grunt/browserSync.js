

module.exports = {

    dev: {
        bsFiles: {
            src: [
                'public/js/*.js',
                'public/css/*.css',
                'public/*.html',
            ]
        },
        options:{
 
            server: {
                baseDir: 'public'
            }
        }

    }
};
