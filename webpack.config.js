const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body'
})
module.exports = {
    devtool: 'source-map',
    entry: [
      './src/index.js',
    ],
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, './src'), path.resolve(__dirname)],
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=images/[name].[ext]',
            },
            {
                test: /\.(otf|eot|woff|woff2|ttf|svg)(\?.+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            },
        ],
    },
    plugins: [HtmlWebpackPluginConfig]
}