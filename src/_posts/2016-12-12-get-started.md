---
layout: post
namespace: Post
title: Get Started
permalink: '/get-started'
background_image: posts/get-started/ia-art.jpg
---

## Introduction

Bring all the power of Barba.js to jekyll and simplify transitions and pages creations. Quickly create a one page site with prefetch, transitions and simple methods to access page flow

## Features

- Webpack
- Hot reload
- Sass (autoprefixer & minification)
- ES6
- Javascript linting

## How to use ?

#### Scripts

- `npm run dev` hot-reload, js lint
- `npm run build` build all pages and assets in public folder

#### Create a new page

Create a file `src/pages/demo.html`

``` javascript
---
layout: page
title: This is a demo page
namespace: Demo
permalink: demo
---
```

Create a file `app/scripts/pages/DemoPage.js`
``` javascript
import Page from './Page'

export default class DemoPage extends Page {
  constructor () {
    super()
  }
}
```

Set routing between namespace and DemoPage class
``` javascript
new BarbaWrapper({
        ...
      })
      .match(...)
      .match('DemoPage', new DemoPage())
      .match(...)
      .start()
```

Now, you have access to flow and utils methods in DemoPage class
``` javascript
onEnter ()
onEnterCompleted ()
onLeave ()
onLeaveCompleted ()

initializeElements ()     // called on enter
initializeEvents ()       // called on enter

addSetInterval ()
addTimeout ()
clearTimeouts ()          // called on leave completed
clearIntervals ()         // called on leave completed
```
NOTE: Don't forgot to call `super` methods

#### BarbaWrapper options

- `cache` : boolean (default: false)  
Limit xhr calls by caching pages
- `prefetch` : boolean (default: false)  
Prefetch the page on mouseover on the link
- `navId` : string (default: null)  
If set to your nav id, `active` class is set on links pointing current page in your nav
- `refreshOnSameHrefClick` : boolean (default: false)  
Set to false to prevent refresh when you click on a link pointing the current page (default behavior with Barba)

#### Debug

- Define `dbg` with a context

``` javascript
const dbg = debug('app:HomePage')

dbg('Hello world')
```

- Type `localStorage.debug="app:*"` in browser console or `localStorage.debug="app:HomePage"` to only debug HomePage.js file

## Some links
- [Barba.js](http://barbajs.org/) by [@luruke](https://twitter.com/luruke)
- [Jekyll](https://jekyllrb.com/docs/home/)
