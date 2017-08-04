import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const getWebpackConfigBase = (config) => {

  const paths = config.utils_paths
  const entry = {
    app: paths.client('scripts/main.js')
  }
  if (config.jsVendors && config.jsVendors.length > 0) {
    entry.vendors = config.jsVendors
  }

  return {
    cache: true,
    stats: config.stats,
    devtool: config.devtool,
    name: 'client',
    target: 'web',
    context: paths.base(),
    entry,
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
      new webpack.DefinePlugin(config.globals),
      new ExtractTextPlugin({
        filename: config.assetsNameCss,
        allChunks: true
      }),
      new webpack.ProvidePlugin({
        debug: 'debug'
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendors",
        minChunks: function(module){
          return module.context && module.context.indexOf("node_modules") !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
      })
    ],
    resolve: {
      extensions: ['.js'],
      alias: {}
    }
  }
}

export default getWebpackConfigBase
