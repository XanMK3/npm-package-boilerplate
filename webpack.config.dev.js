const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.js');

const devConfig = Object.assign({}, baseConfig, {
    devtool: 'eval',
    devServer: {
        contentBase: baseConfig.output.path,
        compress: true,
        port: 3333,
        publicPath: '/',
        https: false,
        overlay: {
            warnings: false,
            errors: true,
        },
    },
});

devConfig.module.rules.push(
    {
        enforce: 'pre',
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
            cache: true,
            emitWarning: true,
        }
    },
    {
        test: /\.css$|\.scss$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
    }
);
devConfig.module.rules.noParse = [/\.min\.js/];

devConfig.plugins.push(
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
    }),
);

module.exports = devConfig;
