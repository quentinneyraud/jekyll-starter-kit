import Page from './Page'

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
  }

  getTransition (options) {
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
