'use strict';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require('./webpack.config.js');

const prodConfig = Object.assign({}, baseConfig, {
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules)/,
                use: "babel-loader",
            },
            {
                test: /\.css$|\.scss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader?sourceMap',
                  'sass-loader?sourceMap',
                ],
              }
        ],
        noParse: [/\.min\.js/]
    },
});

prodConfig.plugins.push(
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].css"
      })
);

prodConfig.externals = {
    'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
    },
    'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
    },
};
prodConfig.output.libraryTarget = 'umd';
prodConfig.output.umdNamedDefine = true;

module.exports = prodConfig;
