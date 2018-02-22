import Page from './Page'
import debug from 'debug'

const dbg = debug('app:AboutPage')

export default class AboutPage extends Page {
  constructor () {
    super()
    dbg('Init AboutPage')
  }
}
