import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const getWebpackConfigBase = (config) => {

  const paths = config.utils_paths

  return {
    stats: config.stats,
    devServer: {
      stats: config.stats,
      port: config.port,
      publicPath: config.publicPath
    },
    name: 'client',
    target: 'web',
    entry: {
      app: paths.client('scripts/main.js')
    },
    output: {
      path: paths.dist(),
      filename: config.assetsNameJs,
      publicPath: config.publicPath
    },
    module: {
      loaders: [{
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: [/node_modules/, /scripts\/lib/]
        }, {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0']
          }
        }, {
          test: /\.scss?$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }],
          })
        }, {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: config.assetsNameImg
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: config.assetsNameCss,
        allChunks: true
      }),
      new webpack.ProvidePlugin({
        debug: 'debug'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: function(module){
          return module.context && module.context.indexOf("node_modules") !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
      }),
      new HtmlWebpackPlugin({
        filename: paths.dist('_layouts/default.html'),
        template: paths.client('html/default-layout.html'),
        cache: false,
        minify: false
      })
    ],
    devtool: config.devtool,
    resolve: {
      extensions: ['.js'],
      alias: {}
    }
  }
}

export default getWebpackConfigBase
