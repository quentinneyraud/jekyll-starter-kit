import debug from 'debug'
import configBase from './base'
import configOverride from './environments'

const dbg = debug('app:config')
dbg('Creating configuration.')
dbg(`Looking for environment overrides for NODE_ENV "${configBase.env}".`)

const overrides = configOverride[configBase.env]
if (configOverride[configBase.env]) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(configBase, overrides(configBase))
} else {
  debug('No environment overrides found.')
}

export default configBase
