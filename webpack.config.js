const webpack = require('webpack')
let commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js')
let uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: { warnings: false, }, 
	output: { comments: false, },
})
module.exports = {
    //插件项
    plugins: [commonsPlugin,uglifyJsPlugin],
    //页面入口文件配置
    entry: './server/server.js',
    //入口文件输出配置
    output: {
        path: './build/server',
        filename: 'app.bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-node'},
        ]
    },
    //其它解决方案配置
    resolve: {}
}
