import debug from 'debug'
import getBaseConfig from './base'
import configOverride from './environments'

const dbg = debug('app:config  ')
dbg.color = debug.colors[1]

const getConfig = () => {
  dbg('👷‍♂️  Creating configuration.')

  let baseConfig = getBaseConfig()

  dbg(`🕵️‍♂️  Looking for environment overrides for NODE_ENV "${baseConfig.env}".`)

  const overrides = configOverride[baseConfig.env]
  if (configOverride[baseConfig.env]) {
    dbg('🙋‍♂️  Found overrides, applying to default configuration.')
    Object.assign(baseConfig, overrides(baseConfig))
  } else {
    dbg('🤷‍♂️  No environment overrides found.')
  }

  return baseConfig
}

export default getConfig
