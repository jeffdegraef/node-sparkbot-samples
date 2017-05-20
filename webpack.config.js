/**
 * Created by Mijn PC on 20/05/2017.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './examples/didatabot.js'
    ],
    output: {
        publicPath: '/',
        filename: 'didata.js'
    },
    devServer: {
        contentBase: "examples"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                include: path.resolve(__dirname, 'examples'),
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015'],
                }
            }
        ]
    }
};