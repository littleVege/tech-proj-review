
/**
 * Created by caidi on 16/6/1.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/static/js/app.js',
    output: { path: path.join(__dirname, 'src/static/js/'), filename: 'bundle.js' },
    debug: true,
    devtool: 'source-map',
    target:'web',
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /platforms|plugins|node_modules|lib/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', './src/static/lib'],
    }
};
