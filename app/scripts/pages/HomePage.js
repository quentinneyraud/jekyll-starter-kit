import Page from './Page'
import {selectClass} from '../utils/index'
import debug from 'debug'

const dbg = debug('app:HomePage')

export default class HomePage extends Page {
  constructor () {
    super()
    dbg('Init HomePage')
  }
}
