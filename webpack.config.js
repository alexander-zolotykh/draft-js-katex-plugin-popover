/* eslint-disable no-var */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2', // necessary for the babel plugin
    path: path.join(__dirname, 'lib-css'), // where to place webpack files
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=draftJsKatexPlugin__[local]__[hash:base64:5]!postcss-loader'
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin(`${path.parse(process.argv[2]).name}.css`),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer({ browsers: ['> 1%'] })
        ]
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};
