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
        filename: 'main.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'examples'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"],
                }
            }
        ]
    },
    debug: true
};