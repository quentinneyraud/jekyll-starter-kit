import Page from './Page'
import {selectClass} from '../utils/index'
import '../lib/MorphSVGPlugin'
import SplitText from '../lib/SplitText.min'

const dbg = debug('app:TitlePage')

export default class TitlePage extends Page {
  constructor () {
    super()
    dbg('Init TitlePage')
  }

  onEnter () {
    super.onEnter()
    selectClass('nav-item', true).forEach(el => el.classList.remove('active'))
    selectClass('nav-item', true)[3].classList.add('active')

    this.titleCutAnimation()
    this.titleMorphAnimation()
    this.titleMorphCuttedAnimation()
  }

  titleCutAnimation () {
    TweenMax.to('.cut.first h1:nth-child(1)', 0.2, {x: '-=6', y: '+=20', repeat: -1, yoyo: true, repeatDelay: 1})
    TweenMax.to('.cut.first h1:nth-child(3)', 0.2, {x: '+=6', y: '-=20', repeat: -1, yoyo: true, repeatDelay: 1})

    TweenMax.to('.cut.second h1:nth-child(2)', 0.2, {x: '-=18', y: '+=60', autoAlpha: 0, repeat: -1, yoyo: true, repeatDelay: 1})
    TweenMax.to('.cut.second h1:nth-child(3)', 0.2, {x: '+=18', y: '-=60', autoAlpha: 0, repeat: -1, yoyo: true, repeatDelay: 1})

    let split = new SplitText('.cut.third h2', {type: 'chars'})

    TweenMax.staggerFromTo(split.chars, 0.2, {
      xPercent: -10,
      autoAlpha: 0
    }, {
      xPercent: 0,
      autoAlpha: 1,
      repeat: -1,
      yoyo: true,
      repeatDelay: 1
    }, 0.05)

    let tweens = []

    selectClass('cut-fourth-div', true).forEach((el) => {
      let h1 = Array.from(el.getElementsByTagName('h1'))

      let tl = new TimelineMax()
        .to(h1[0], 0.4, {x: '-=25', y: '+=60', autoAlpha: 0}, 'start')
        .to(h1[1], 0.4, {autoAlpha: 0}, 'start')
        .to(h1[2], 0.4, {x: '+=25', y: '-=60', autoAlpha: 0}, 'start')

      tweens.push(tl)
    })

    let index = 0
    const hideCurrent = () => {
      tweens[index].play()
    }

    const show = () => {
      tweens[index].reverse()
    }

    show()

    document.querySelector('.cut.fourth a:nth-of-type(1)').addEventListener('click', (e) => {
      e.preventDefault()
      hideCurrent()
      if (index === 0) {
        index = 2
      } else {
        index--
      }
      show()
    })

    document.querySelector('.cut.fourth a:nth-of-type(2)').addEventListener('click', (e) => {
      e.preventDefault()
      hideCurrent()
      if (index === 2) {
        index = 0
      } else {
        index++
      }
      show()
    })
  }

  titleMorphAnimation () {
    let para = MorphSVGPlugin.convertToPath('#parallelogram-svg')
    TweenMax.to(para, 1, {morphSVG: '#shift-svg', yoyo: true, repeat: -1, repeatDelay: 1})
  }

  titleMorphCuttedAnimation () {
    TweenMax.to('#shift-svg', 0.8, {morphSVG: '#shift-cutted-svg', yoyo: true, repeat: -1, repeatDelay: 1, ease: Power2.easeIn})
  }
}
