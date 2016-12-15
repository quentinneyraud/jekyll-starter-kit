import Page from './Page'
import {fixImageSeo, selectClass} from '../utils/index'

const dbg = debug('app:PostPage')

export default class ProjectPage extends Page {
  constructor () {
    super()
    dbg('Init PostPage')
  }

  initializeElements () {
    super.initializeElements()
  }

  onEnter () {
    dbg('on enter')
    fixImageSeo(selectClass('post-hero_img'), selectClass('post-bg_hero_img'))
  }
}
