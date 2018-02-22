import App from './App'

/* eslint no-new:0 */
new App()

if (module.hot.accept) {
  module.hot.accept(() => {
    location.reload(true)
  })
}
