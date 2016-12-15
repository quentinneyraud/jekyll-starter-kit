import Page from './Page'
import {selectClass} from '../utils/index'

const dbg = debug('app:HomePage')

export default class HomePage extends Page {
  constructor () {
    super()
    dbg('Init HomePage')
  }

  initializeElements () {
    super.initializeElements()
  }

  onEnter () {
    super.onEnter()
    selectClass('nav-item', true).forEach(el => el.classList.remove('active'))
    selectClass('nav-item', true)[0].classList.add('active')
  }

  getTransition (options) {
    dbg(options)
    switch (options.datas.transition) {
      case 'custom-transition':
        return {
          start: function () {
            this.newContainerLoading.then(this.hide.bind(this))
          },

          hide: function () {
            this.done()
          }
        }
      default:
        break
    }
  }
}
