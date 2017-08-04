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

    Object.assign(this.$els, {
      myDiv: selectClass('whatever-you-want-in-this-page')
    })
  }

  onEnter () {
    super.onEnter()

    // globals demo
    const apiEndpoint = (PRODUCTION) ? 'http://api-prod/' : 'http://api-dev/'
    console.log(apiEndpoint)

    // addInterval demo
    const intervalId = window.setInterval(() => {
      console.log('I will be killed on page leave 😬')
    }, 1000)

    this.addInterval(intervalId)
  }

  getTransition (options) {
    switch (options.datas.transition) {
      case 'my-custom-transition':
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
