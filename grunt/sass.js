module.exports = {
    dev: {
        options: {
            outputStyle: 'expanded',
            sourceMap:true
        },
        files: {
            'public/css/<%= githash.main.short %>.css': 'src/scss/index.scss'
        }
    },
    prod: {
        options: {
            outputStyle: 'compressed',
            sourceMap:false
        },
        files: {
            'public/css/<%= githash.main.short %>.css': 'src/scss/index.scss'
        }
    }
};
