const Bundler = require('parcel-bundler')
const path = require('path')
const fs = require('fs')
const del = require('del')

const env = process.env.NODE_ENV || 'development'
const entryPoint = path.join(__dirname, '../app/html/default.html')

const isProduction = () => {
  return env === 'production'
}

// Bundler options
const options = {
  outDir: './src/_layouts',
  outFile: 'default.html',
  publicUrl: '/assets',
  watch: !isProduction(),
  cache: !isProduction(),
  cacheDir: '.cache',
  minify: isProduction(),
  target: 'browser',
  https: false,
  logLevel: 3,
  hmrPort: 0,
  sourceMaps: !isProduction(),
  hmrHostname: '',
  detailedReport: false
}

const bundler = new Bundler(entryPoint, options)

/**
 Assets
 **/
const assetPluginOptions = {
  typesToMove: ['js', 'css'],
  assetsFolder: path.resolve(__dirname, '../src/assets')
}
if (!isProduction()) {
  assetPluginOptions.typesToMove.push('map')
}
let assetsToMove = []

const createEmptyAssetsFolder = () => {
  if (fs.existsSync(assetPluginOptions.assetsFolder)) {
    del.sync(assetPluginOptions.assetsFolder)
  }
  fs.mkdirSync(assetPluginOptions.assetsFolder)
}

const addAsset = (bundle, publicURL) => {
  if (assetPluginOptions.typesToMove.indexOf(bundle.type) > -1) {
    assetsToMove.push(path.basename(bundle.name))
  }

  bundle.childBundles.forEach(function (bundle) {
    addAsset(bundle, publicURL)
  })
}

bundler.on('bundled', (bundle) => {
  const dir = bundle.entryAsset.options.outDir
  const publicURL = bundle.entryAsset.options.publicURL
  assetsToMove = []

  addAsset(bundle, publicURL)

  assetsToMove.forEach((assetFilename) => {
    // Parcel rebuild only changed files
    if (!fs.existsSync(path.resolve(dir, assetFilename))) {
      return false
    }
    fs.rename(path.resolve(dir, assetFilename), path.resolve(assetPluginOptions.assetsFolder, assetFilename), (err) => {
      if (err) {
        console.log('err', err)
      }
    })
  })
})

createEmptyAssetsFolder()
bundler.bundle()
