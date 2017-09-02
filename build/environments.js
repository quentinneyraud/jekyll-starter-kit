import webpack from 'webpack'
import debug from 'debug'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import Harddisk from 'html-webpack-harddisk-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const dbg = debug('app:webpack-config:environments  ')
dbg.color = debug.colors[5]

export default {
  development: (base, config) => ({
    devServer: {
      stats: config.stats,
      port: config.port,
      publicPath: config.publicPath,
      host: config.address,
      watchOptions: {
        ignored: /node_modules/
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: config.utils_paths.dist('_layouts/default.html'),
        template: config.utils_paths.client('html/default-layout.html'),
        cache: false,
        alwaysWriteToDisk: true,
        minify: false
      }),
      new Harddisk(),
      new webpack.HotModuleReplacementPlugin(),
    ]
  }),

  production: (base, config) => {
    dbg('🗑  Cleaning assets folder')
    dbg('👽  Using UglifyJs')
    dbg('🎨  Using PostCss')
    return {
      module: {
        loaders: [{
          test: /\.scss?$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
            ],
          })
        }]
      }, plugins: [
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
            screw_ie8: true,
            keep_fnames: true
          },
          compress: {
            screw_ie8: true
          },
          comments: false
        }),
        new CleanWebpackPlugin(['assets'], {
          root: config.utils_paths.dist(),
          verbose: false
        }),
        new HtmlWebpackPlugin({
          filename: config.utils_paths.dist('_layouts/default.html'),
          template: config.utils_paths.client('html/default-layout.html'),
          cache: true,
          minify: {
            minifyCSS: true
          }
        })
      ]
    }
  }
}
