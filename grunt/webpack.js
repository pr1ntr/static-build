var webpack = require('webpack');

var vendors = [];

var loaders = [
    {
        test: /\.js$|\.jsx$/i,
        exclude: /node_modules/,
        loader: 'babel'

    },
    {
        test: /\.(woff|ttf|eot|svg|png)(\?.*)?/,
        loader: 'url-loader'
    }
];

var entry = {
    app: './src/js/app.js',
    vendor: vendors

};

var output = {
    path: './public/js',
    publicPath: '/js/',
    filename: 'app.<%= githash.main.short %>.js',
    chunkFilename: 'app.[id].js'
};

module.exports = {
    dev: {
        devtool: 'source-map',
        debug:true,
        entry: entry,
        output: output,
        module: {
            loaders: loaders
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'app.vendors_<%= githash.main.short %>.js')
        ],
        target: 'web',
        watch: true
    },
    prod: {
        entry: entry,
        output: output,
        module: {
            loaders: loaders
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'app.vendors_<%= githash.main.short %>.js'),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                drop_console: true,
                mangle: {
                    except: vendors
                }}
            )
        ],
        target: 'web'
    }
};
