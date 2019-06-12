var webpack = require("webpack");
var path = require("path");
var defaults = {
    entry: "./app/index.jsx",
    output: {
        path: path.join(__dirname, "./public/js"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "stage-0", "react"],
                    plugins: ["babel-plugin-transform-runtime"]
                }
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty",
        dns: "empty"
    }
};

module.exports = defaults;
