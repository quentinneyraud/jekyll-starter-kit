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

  getTransition (clickOptions) {}

  initializeElements () {
    this.$els = {
      window,
      body: document.body
    }
  }

  initializeEvents () {}

  addSetInterval (intervalId) {
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
