import debug from 'debug'
import path from 'path'

const dbg = debug('app:config:base')

const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'app',
  dir_dist: 'src',
  stats: {
    chunks : false,
    chunkModules : false,
    colors : true,
    children: false,
    version: false,
    reasons: false
  },
  publicPath: '/',

  // ----------------------------------
  // Outputs
  // ----------------------------------
  assetsNameJs: '[name].js',
  assetsNameImg: '[name].[ext]',
  assetsNameCss: '[name].css',

  // ----------------------------------
  // SVG Structure
  // ----------------------------------

  svg_paths: 'src-svg/*.svg',
  svg_sprite_name: 'svg.html',
  svg_sprite_path: '_includes'
}

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
}

dbg('Exporting default configuration')

export default config
