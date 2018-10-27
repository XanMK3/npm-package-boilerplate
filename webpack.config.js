const path = require('path');
const webpack = require('webpack');

const srcPath = path.join(__dirname, 'components');
const distPath = path.join(__dirname, 'dist/');

module.exports = {
    context: srcPath,
    entry: {
        index: ['./index.js'],
    },
    output: {
        path: distPath,
        filename: '[name].js',
    },
    resolve: {
        modules: ['node_modules', srcPath],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /en|zh|ru/
        ),
    ],
};
