const Bundler = require('parcel-bundler')
const path = require('path')
const fs = require('fs')

const entryPoint = path.join(__dirname, '../app/html/default.html')

// Bundler options
const options = {
  outDir: './src/_layouts',
  outFile: 'default.html',
  publicUrl: '/assets',
  watch: true,
  cache: true,
  cacheDir: '.cache',
  minify: false,
  target: 'browser',
  https: false,
  logLevel: 3,
  hmrPort: 0,
  sourceMaps: true,
  hmrHostname: '',
  detailedReport: false
}

const bundler = new Bundler(entryPoint, options)

/**
 Assets
 **/
const assetPluginOptions = {
  typesToMove: ['map', 'js', 'css'],
  assetsFolder: path.resolve(__dirname, '../src/assets')
}
let assetsToMove = []

const createAssetsFolder = () => {
  if (!fs.existsSync(assetPluginOptions.assetsFolder)) {
    fs.mkdirSync(assetPluginOptions.assetsFolder)
  }
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

createAssetsFolder()
bundler.bundle()
