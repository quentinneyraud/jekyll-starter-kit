import debug from 'debug'
import path from 'path'
import ip from 'ip'

const dbg = debug('app:config:base  ')

const env = process.env.NODE_ENV || 'development'
const getBaseConfig = () => {
  let baseConfig = {
    env,
    address: ip.address(), // or 'localhost'
    port: '8081',
    devtool: 'source-map',
    publicPath: '/',

    // ----------------------------------
    // Stats
    // ----------------------------------
    stats: {
      chunks : false,
      chunkModules : false,
      colors : true,
      children: false,
      version: false,
      reasons: false
    },

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base: path.resolve(__dirname, '..'),
    dir_client: 'app',
    dir_dist: 'src',

    // ----------------------------------
    // Inputs
    // ----------------------------------
    jsVendors: [],

    // ----------------------------------
    // Outputs
    // ----------------------------------
    assetsNameJs: '[name].js',
    assetsNameImg: '[name].[ext]',
    assetsNameCss: 'style.css',

    // ----------------------------------
    // SVG Structure
    // ----------------------------------
    svg_paths: 'svg/*.svg',
    svg_sprite_name: 'svg.html',
    svg_sprite_path: '_includes',

    // ----------------------------------
    // Images
    // ----------------------------------
    limit_image_size: 8000, // 8kb,

    // ----------------------------------
    // Globals
    // ----------------------------------
    // ⚠️ : You have to add all these constants to .eslintrc file
    globals: {
      'DEVELOPMENT': JSON.stringify(env === 'development'),
      'PRODUCTION': JSON.stringify(env === 'production'),
      'ENVIRONMENT': JSON.stringify(env)
    }
  }

  // ------------------------------------
// Utilities
// ------------------------------------
  const resolve = path.resolve
  const base = (...args) =>
    Reflect.apply(resolve, null, [baseConfig.path_base, ...args])

  baseConfig.utils_paths = {
    base   : base,
    client : base.bind(null, baseConfig.dir_client),
    dist   : base.bind(null, baseConfig.dir_dist)
  }

  dbg('⚙  Exporting default configuration.')
  return baseConfig
}

export default getBaseConfig
