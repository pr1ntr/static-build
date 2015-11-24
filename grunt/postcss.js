module.exports = {
    dev: {
        options: {
            map: false,
            processors: [
                require('postcss-normalize'),
                require('autoprefixer')(({browsers: 'last 2 versions'}))

            ]
        },
        files: {
            'public/css/<%= githash.main.short %>.css': 'public/css/<%= githash.main.short %>.css'
        }
    },
    prod: {
        options: {
            map: false,
            processors: [
                require('postcss-normalize'),
                require('autoprefixer')(({browsers: 'last 2 versions'})),
                require('cssnano')()
            ]
        },
        files: {
            'public/css/<%= githash.main.short %>.css': 'public/css/<%= githash.main.short %>.css'
        }
    }
};

