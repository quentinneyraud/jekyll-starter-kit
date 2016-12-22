import Barba from 'barba.js'

const DEFAULT_OPTIONS = {
  cache: false,
  prefetch: false,
  navId: 'nav',
  refreshOnSameHrefClick: false
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
    this.navLinks = (this.options.navId) ? Array.from(document.getElementById(this.options.navId).getElementsByTagName('a')) : null
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

    // Transitions
    Barba.Dispatcher.on('linkClicked', this.onBarbaLinkClicked.bind(this))

    // Refresh
    if (!this.options.refreshOnSameHrefClick) {
      Array.from(document.querySelectorAll('a[href]')).forEach((link) => {
        link.addEventListener('click', this.onLinkClicked.bind(this))
      })
    }

    // Update links
    if (this.navLinks && this.navLinks.length) {
      this.onBarbaNewPageReady()
      Barba.Dispatcher.on('newPageReady', this.onBarbaNewPageReady.bind(this))
    }
  }

  onLinkClicked (event) {
    if (event.currentTarget.href === window.location.href) {
      event.preventDefault()
      event.stopPropagation()
    }
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
        new TimelineMax()
          .to('.overflow-transition', 0.5, {width: window.innerWidth})
          .set('.overflow-transition', {left: 0})
          .set(this.oldContainer, {autoAlpha: 0})
          .set(this.newContainer, {autoAlpha: 1})
          .to('.overflow-transition', 0.5, {width: 0})
          .set('.overflow-transition', {right: 0, left: 'auto'})
          .call(() => {
            this.done()
          })
      }
    }
  }

  /**
   * Add active class on all links matching current url
   */
  onBarbaNewPageReady () {
    this.navLinks.forEach((link) => {
      if (link.getAttribute('href') === window.location.pathname) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  }
}
