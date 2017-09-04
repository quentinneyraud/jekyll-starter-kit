import debug from 'debug'
import webpackConfigOverride from './environments'
import getBaseWebpackConfig from './base'
import WebpackMerge from 'webpack-merge'

const dbg = debug('app:webpack-config  ')

const getBuild = (config) => {
  dbg('👷‍♂️  Creating webpack configuration')
  const base = getBaseWebpackConfig(config)
  dbg(`🕵️‍♂️  Looking for environment overrides for NODE_ENV "${config.env}".`)

  const overrides = webpackConfigOverride[config.env]
  if (webpackConfigOverride[config.env]) {
    dbg('🙋‍♂️  Found overrides, applying to default configuration.')
    return WebpackMerge.smart(base, overrides(base, config))
  } else {
    dbg('🤷‍♂️  No environment overrides found.')
    return base
  }
}

export default getBuild
