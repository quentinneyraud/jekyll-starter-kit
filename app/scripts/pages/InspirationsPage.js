import Page from './Page'
import {selectClass} from '../utils/index'

const dbg = debug('app:InspirationsPage')

export default class InspirationsPage extends Page {
  constructor () {
    super()
    dbg('Init InspirationsPage')
  }

  onEnter () {
    super.onEnter()
    selectClass('nav-item', true).forEach(el => el.classList.remove('active'))
    selectClass('nav-item', true)[1].classList.add('active')
  }
}
