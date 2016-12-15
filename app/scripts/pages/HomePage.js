import Page from './Page'
import {selectClass, selectId, randomFloat, randomInt} from '../utils/index'
import raf from 'raf'

const dbg = debug('app:HomePage')

export default class HomePage extends Page {
  constructor () {
    super()
    dbg('Init HomePage')
  }

  initializeElements () {
    super.initializeElements()
    Object.assign(this.$els, {
      canvas: selectId('canvas'),
      title: selectClass('title'),
      subtitle: selectClass('subtitle')
    })

    this.context = this.$els.canvas.getContext('2d')

    // mask canvas
    this.maskCanvas = document.createElement('canvas')
    this.maskContext = this.maskCanvas.getContext('2d')
  }

  onEnter () {
    super.onEnter()
    selectClass('nav-item', true).forEach(el => el.classList.remove('active'))
    selectClass('nav-item', true)[0].classList.add('active')

    this.figures = []
    this.isReady = false
    setTimeout(() => {
      this.isReady = true
    }, 5000)

    TweenMax.set(this.$els.subtitle, {autoAlpha: 0, xPercent: -50})
    TweenMax.set(this.$els.title, {xPercent: 50})

    this.setCanvasSize()
    this.defineFigures()
    this.animate()
    this.draw()
  }

  setCanvasSize () {
    this.$els.canvas.width = window.innerWidth
    this.$els.canvas.height = window.innerHeight
    this.maskCanvas.height = window.innerHeight
    this.maskCanvas.width = window.innerWidth
  }

  defineFigures () {
    for (let i = 0; i < 5; i++) {
      const width = randomInt(150, 300)
      const height = 50
      const diffAngle = 30
      const firstPoint = {x: randomInt(window.innerWidth / 2 - 200, window.innerWidth / 2 + 200), y: 300 + i * 100}

      this.figures.push([
        firstPoint,
        {
          x: firstPoint.x + width,
          y: firstPoint.y
        }, {
          x: firstPoint.x + width - diffAngle,
          y: firstPoint.y + height
        }, {
          x: firstPoint.x - diffAngle,
          y: firstPoint.y + height
        }
      ])
    }
  }

  animate () {
    this.figures.forEach((figure) => {
      const speed = randomFloat(1, 2.5)
      const delay = randomFloat(0, 1)

      figure.forEach((point) => {
        new TimelineMax({repeat: -1, delay})
          .from(point, speed, {x: '-=1000', ease: Power1.easeOut, onComplete: this.checkReady.bind(this)})
          .to(point, speed, {x: '+=1000', ease: Power1.easeIn})
      })
    })
  }

  checkReady () {
    if (this.isReady) {
      const midFigure = this.figures[Math.ceil(this.figures.length / 2)]

      TweenMax.killTweensOf(midFigure)
      TweenMax.to(midFigure[0], 1, {x: 0, y: 0})
      TweenMax.to(midFigure[1], 1, {x: window.innerWidth, y: 0})
      TweenMax.to(midFigure[2], 1, {x: window.innerWidth, y: window.innerHeight})
      TweenMax.to(midFigure[3], 1, {x: 0, y: window.innerHeight})

      TweenMax.to(this.$els.title, 0.3, {xPercent: 0, delay: 1})
      TweenMax.to(this.$els.subtitle, 0.3, {xPercent: 0, autoAlpha: 1, ease: Power2.easeIn, delay: 1})
    }
  }

  maskEffect () {
    this.maskCanvas.height = window.innerHeight
    this.maskCanvas.width = window.innerWidth

    this.maskContext.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.maskContext.fillStyle = '#eee'
    this.maskContext.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.maskContext.globalCompositeOperation = 'destination-out'

    this.figures.forEach((figure) => {
      this.maskContext.beginPath()
      this.maskContext.moveTo(figure[0].x, figure[0].y)

      figure.forEach((point) => {
        this.maskContext.lineTo(point.x, point.y)
      })

      this.context.strokeStyle = '#000'
      this.context.stroke()
      this.maskContext.fill()
    })
  }

  draw () {
    this.context.clearRect(0, 0, this.$els.canvas.width, this.$els.canvas.height)

    this.maskEffect()

    this.context.drawImage(this.maskCanvas, 0, 0)

    raf(this.draw.bind(this))
  }
}
