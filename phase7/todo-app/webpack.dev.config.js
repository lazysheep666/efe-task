let path = require('path');
let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  devtool: "cheap-eval-source-map",
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 启用 HMR
  ],
  devServer: {
    port: 7777,
    host: 'localhost',
    hot: true, // 告诉 dev-server 我们在使用 HMR
    contentBase: __dirname,
    inline: true
  }
};
