import getConfig from './config/index'
import getBuild from './build'

module.exports = getBuild(getConfig())
