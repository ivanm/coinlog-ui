const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('tailwindcss'),
                                require('autoprefixer'),
                                require('postcss-nested')
                            ]
                        }
                    }
                ]
            },
            {
                type: 'javascript/auto',
                test: /manifest\.json$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'manifest.json'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ]
};
