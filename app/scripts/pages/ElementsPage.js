import Page from './Page'
import {selectClass} from '../utils/index'

const dbg = debug('app:InspirationsPage')

export default class ElementsPage extends Page {
  constructor () {
    super()
    dbg('Init ElementsPage')
  }

  onEnter () {
    super.onEnter()
    selectClass('nav-item', true).forEach(el => el.classList.remove('active'))
    selectClass('nav-item', true)[2].classList.add('active')
  }
}
