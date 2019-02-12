var webpack = require('webpack');
var path = require('path');
var defaults = {
    entry: './app/index.jsx',
    output: {
        path: path.join(__dirname, './resources/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "stage-0", "react"],
                    plugins: ["babel-plugin-transform-runtime"]
                    }
            }
        ]
    },
    resolve: {extensions: ['.js', '.jsx']},
};

module.exports = defaults;

