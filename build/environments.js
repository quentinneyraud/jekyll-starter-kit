import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import Harddisk from 'html-webpack-harddisk-plugin'

export default {
  development: (base, config) => ({
    plugins: [
      new HtmlWebpackPlugin({
        filename: config.utils_paths.dist('_layouts/default.html'),
        template: config.utils_paths.client('html/default-layout.html'),
        cache: false,
        alwaysWriteToDisk: true,
        minify: false
      }),
      new Harddisk()
    ]
  }),

  production: (base, config) => ({
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
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          eslint: {
            configFile: './.eslintrc'
          },
          postcss: {
            plugins: [
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
          }
        }
      }),
      new CleanWebpackPlugin(['src/assets'], {
        verbose: true
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
  })
}
