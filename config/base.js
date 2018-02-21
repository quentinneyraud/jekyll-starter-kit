import debug from 'debug'
import path from 'path'
import ip from 'ip'

const dbg = debug('app:config:base  ')

const env = process.env.NODE_ENV || 'development'
const getBaseConfig = () => {
  let baseConfig = {
    env,

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base: path.resolve(__dirname, '..'),
    dir_client: 'app',
    dir_dist: 'src',

    // ----------------------------------
    // SVG Structure
    // ----------------------------------
    svg_paths: 'svg/*.svg',
    svg_sprite_name: 'svg.html',
    svg_sprite_path: '_includes',
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
