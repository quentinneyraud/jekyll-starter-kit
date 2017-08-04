import Barba from 'barba.js'

export default class Page {
  constructor () {
    this.active = false
    this.intervals = []
    this.timeouts = []
    this.$els = {}
  }

  initializeBarba (namespace) {
    Barba.BaseView.extend({
      namespace: namespace,
      onEnter: this.onEnter.bind(this),
      onEnterCompleted: this.onEnterCompleted.bind(this),
      onLeave: this.onLeave.bind(this),
      onLeaveCompleted: this.onLeaveCompleted.bind(this)
    }).init()
  }

  onEnter () {
    this.active = true
    this.initializeElements()
    this.initializeEvents()
  }

  onEnterCompleted () {}

  onLeave () {
    this.active = false
  }

  onLeaveCompleted () {
    this.clearIntervals()
    this.clearTimeouts()
  }

  /**
   * Return
   * @param options contains el (<a> element) and data attributes
   */
  getTransition (options) {}

  /**
   * Fill $els with body and window elements
   * called on enter
   */
  initializeElements () {
    this.$els = {
      window,
      body: document.body
    }
  }

  /**
   * Initialize all events
   * called on enter, after initializeElements()
   */
  initializeEvents () {}

  /**
   * Add interval and timeout ids, they will be cleared on leave
   */

  addInterval (intervalId) {
    this.intervals.push(intervalId)
  }

  clearIntervals () {
    this.intervals.forEach((intervalId) => {
      clearInterval(intervalId)
    })
  }

  addTimeout (timeoutId) {
    this.timeouts.push(timeoutId)
  }

  clearTimeouts () {
    this.timeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
  }
}
