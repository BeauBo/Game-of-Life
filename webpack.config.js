var path = require('path');
var webpack = require ('webpack');

module.exports = {
    devServer : {
        stats: 'errors-only'
    },
    
    entry: path.resolve(__dirname, 'dev/index.js'),
    
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    
    module: {
        loaders: [
            
            {
                loader: 'babel-loader',
                test: /\.js$/,
                include: path.resolve(__dirname,'dev'),
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ["transform-class-properties"]
                }
            },
            
            {
                loader: 'style-loader!css-loader!sass-loader',
                test: /\.scss$/
            }
            ]
    },
    
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
}