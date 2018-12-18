var webpack = require('webpack');
var path = require('path');
const defaults = {
    entry: './app/index.jsx',
    output: {
        path: path.join(__dirname, './resources/js'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {extensions: ['.js', '.jsx']},
};

module.exports = defaults;

