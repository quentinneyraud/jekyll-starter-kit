let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require("webpack");
let cssnano = require('cssnano');
let path = require('path');

module.exports = {
  devServer: {
    stats: {
      colors: true,
      chunks: false
    }
  },
  name: 'client',
  target: 'web',
  entry: {
    app: "./app/scripts/main.js"
  },
  eslint: {
    configFile: './.eslintrc'
  },
  output: {
    path: 'src/assets',
    filename: "app.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: [/node_modules/, /scripts\/lib/]
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      }, {
        test: /\.scss?$/,
        loader: ExtractTextPlugin.extract('css?sourceMap&-minimize!postcss!sass?sourceMap')
      },
      {test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css', {
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
      debug: 'debug'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      'CSSPlugin': 'gsap/src/uncompressed/plugins/CSSPlugin',
      'TweenLite': 'gsap/src/uncompressed/TweenLite'
    }
  },
  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    })
  ]
};
