const path = require('path');
module.exports = {
    mode: 'development',
    watch: true,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            {
                test: /(\.js)|(\.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
        }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        watchContentBase: true,
        compress: true,
      },
}