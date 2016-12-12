import Barba from 'barba.js'

const DEFAULT_OPTIONS = {
  cache: false,
  prefetch: false
}

export default class BarbaWrapper {
  constructor (options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    this.pages = []
    return this
  }

  match (namespace, page) {
    page.initializeBarba(namespace)
    this.pages.push(page)
    return this
  }

  start () {
    Barba.Pjax.cacheEnabled = this.options.cache
    Barba.Pjax.start()
    if (this.options.prefetch) Barba.Prefetch.init()

    Barba.Dispatcher.on('linkClicked', this.onBarbaLinkClicked.bind(this))
  }

  onBarbaLinkClicked (el) {
    const transition = this.getActivePage().getTransition({
      el,
      transition: el.getAttribute('data-transition')
    }) || this.getDefaultTransition()

    Barba.Pjax.getTransition = () => {
      return Barba.BaseTransition.extend(transition)
    }
  }

  getActivePage () {
    return this.pages.find(page => page.active)
  }

  getDefaultTransition () {
    return {
      start: function () {
        this.newContainerLoading.then(this.finish.bind(this))
      },

      finish: function () {
        document.body.scrollTop = 0
        this.done()
      }
    }
  }
}
