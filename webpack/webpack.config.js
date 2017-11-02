const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    path.join(__dirname, '../src/index.js') //入口文件
  ],
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash:5].js',
    path: path.join(__dirname, '/'),
    publicPath: '/'
  },
  resolve: {
    modules: [path.join(__dirname, '../node_modules')], //优化webpack文件搜索范围
    extensions: ['.web.js', '.jsx', '.js', '.json']
  },
  devtool: 'cheap-module-eval-source-map', //开启生成source-map文件功能便于代码调试
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&loaclIdentName=[loacl]-[hash:base64:5]', //编译css文件的loader并开启css-modules功能
        ],
        exclude: /node_modules/
      },
      {
        test: /.\less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&loaclIdentName=[loacl]-[hash:base64:5]', //编译css文件的loader并开启css-modules功能
          'less-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
        use: ['url-loader?limit=10240']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),//报错时不退出webpack进程
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"' //用于区分开发和生产环境
    })
  ]
}