export default {
  development: (config) => ({

  }),

  production: (config) => ({
    assetsNameJs: '[name].[hash]',
    assetsNameImg: '[name].[hash]',
    assetsNameCss: '[name].[chunkhash]',
  })
}
