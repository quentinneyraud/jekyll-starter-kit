export default {
  development: (config) => ({
    publicPath: `http://localhost:${config.port}/`
  }),

  production: (config) => ({
    devtool: false,
    assetsNameJs: 'assets/js/[name].[hash].js',
    assetsNameImg: 'assets/img/[name].[hash].[ext]',
    assetsNameCss: 'assets/css/[name].[chunkhash].css'
  })
}
