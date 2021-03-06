const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js',
        events: './events.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                  loader: 'babel-loader',
                    options: { presets: ['es2015']}
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,
        })
    ]
};