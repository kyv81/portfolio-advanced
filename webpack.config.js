var webpack = require('webpack'),
    uglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new uglifyJSPlugin({
            sourceMap: true 
        })
    ]
};

module.exports = config;