import App from './App'

/* eslint no-new:0 */
new App()

if (module.hot) {
  module.hot.accept(() => {
    location.reload(true)
  })
}
