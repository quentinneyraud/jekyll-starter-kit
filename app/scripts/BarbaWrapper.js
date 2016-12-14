import Barba from 'barba.js'

const DEFAULT_OPTIONS = {
  cache: false,
  prefetch: false
}

export default class BarbaWrapper {
  /**
   * Merge options
   *
   * @param options See available options in DEFAULT_OPTIONS
   * @returns {BarbaWrapper}
   */
  constructor (options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    this.pages = []
    return this
  }

  /**
   * Create a Barba view
   *
   * @param namespace that is set in front matter
   * @param page instance which extends Page
   * @returns {BarbaWrapper}
   */
  match (namespace, page) {
    page.initializeBarba(namespace)
    this.pages.push(page)
    return this
  }

  /**
   * Call it after all match()
   */
  start () {
    Barba.Pjax.cacheEnabled = this.options.cache
    Barba.Pjax.start()
    if (this.options.prefetch) Barba.Prefetch.init()

    Barba.Dispatcher.on('linkClicked', this.onBarbaLinkClicked.bind(this))
  }

  /**
   * Define transition on link click, getting it from active page instance or use default
   *
   * @param el element clicked
   */
  onBarbaLinkClicked (el) {
    const transition = this.getActivePage().getTransition({
      el,
      datas: Object.assign({}, el.dataset)
    }) || this.getDefaultTransition()

    Barba.Pjax.getTransition = () => {
      return Barba.BaseTransition.extend(transition)
    }
  }

  /**
   * Return current page
   *
   * @returns {*}
   */
  getActivePage () {
    return this.pages.find(page => page.active)
  }

  /**
   * Return a fade transition
   *
   * @returns {{start: start, finish: finish}}
   */
  getDefaultTransition () {
    // Note : Do not use arrow function to keep Barba.BaseTransition context
    return {
      start: function () {
        this.newContainerLoading
          .then(this.transition.bind(this))
      },
      transition: function () {
        TweenMax.to(this.oldContainer, 1, {xPercent: -100})
        TweenMax.fromTo(this.newContainer, 1, {xPercent: 100}, {xPercent: 0, autoAlpha: 1, onComplete: this.done.bind(this)})
      }
    }
  }
}
