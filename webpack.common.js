const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist/*.*']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Production'
        })
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        port: 7000
    }
};