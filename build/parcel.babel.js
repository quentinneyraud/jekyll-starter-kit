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
  outDir: path.resolve('./src/_layouts'),
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
  typesToIgnore: ['html'],
  assetsFolder: path.resolve(__dirname, '../src/assets')
}
let assetsToMove = []

// Ignore sourcemaps files on build
if (isProduction()) {
  assetPluginOptions.typesToIgnore.push('map')
}

/**
 * Delete & then create assets folder
 */
const createEmptyAssetsFolder = () => {
  if (fs.existsSync(assetPluginOptions.assetsFolder)) {
    del.sync(assetPluginOptions.assetsFolder)
  }
  fs.mkdirSync(assetPluginOptions.assetsFolder)
}

/**
 * Check all bundles
 * @param bundle
 */
const addAsset = (bundle) => {
  // Check if bundle type is not ignored & if file exists
  if (assetPluginOptions.typesToIgnore.indexOf(bundle.type) < 0
      && fs.existsSync(path.resolve(options.outDir, bundle.name))) {
    assetsToMove.push(path.basename(bundle.name))
  }

  bundle.childBundles.forEach(bundle => addAsset(bundle))
}

bundler.on('bundled', (bundle) => {
  // Clear previous assets
  assetsToMove = []

  addAsset(bundle)

  // Move all assets from default output folder to the assets folder
  assetsToMove.forEach((assetFilename) => {
    fs.rename(path.resolve(options.outDir, assetFilename), path.resolve(assetPluginOptions.assetsFolder, assetFilename), (err) => {
      if (err) {
        console.log('err', err)
      }
    })
  })
})

createEmptyAssetsFolder()
bundler.bundle()
