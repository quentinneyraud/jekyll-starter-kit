import Page from './Page'
import {selectClass} from '../utils/index'

const dbg = debug('app:AboutPage')

export default class AboutPage extends Page {
  constructor () {
    super()
    dbg('Init AboutPage')
  }

  initializeElements () {
    super.initializeElements()
  }

  onEnter () {
    super.onEnter()

    selectClass('nav-item', true).forEach(el => el.classList.remove('active'))
    selectClass('nav-item', true)[1].classList.add('active')
  }
}
