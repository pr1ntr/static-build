var mozjpeg = require('imagemin-mozjpeg');
module.exports = {
    dist:{
        options: {
            svgoPlugins: [{ removeViewBox: false }],
            use: [mozjpeg()]
        }
        ,files:[{
            expand:true
            ,cwd:'src/images/'
            ,src:['**/*.{png,jpg,gif,svg}']
            ,dest:'public/images/'
        }]
    }
};
