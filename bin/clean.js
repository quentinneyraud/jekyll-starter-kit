import PromptConfirm from 'prompt-confirm'
import fs from 'fs'
import debug from 'debug'

const dbg = debug('app:clean')

const FILES_TO_REMOVE = [
  // pages
  'app/scripts/pages/AboutPage.js',
  'app/scripts/pages/HomePage.js',
  'app/scripts/pages/PostPage.js',
  'src/pages/about.html',
  // posts
  'src/_posts/2016-12-12-get-started.md',
  // styles
  'app/styles/partials/_about.scss',
  'app/styles/partials/_home.scss',
  'app/styles/partials/_post.scss',
  // images
  'app/img/about_background.jpg',
  'app/img/home_background.jpg',
  'static/img/',
  // svgs
  'app/src-svg/github.svg',
  'app/src-svg/twitter.svg'
]

const FILES_TO_UPDATE = [
  {
    filePath: 'app/styles/main.scss',
    linesToRemove: [
      '@import \'partials/home\';'
    ]
  }, {
    filePath: 'app/scripts/App.js',
    linesToRemove: [
      '.match(\'HomePage\', new HomePage())',
      '.match(\'AboutPage\', new AboutPage())',
      '.match(\'PostPage\', new PostPage())'
    ]
  }, {
    // filePath: 'src/_includes/header.html',
    linesToRemove: [
      '<li class="nav-item"><a class="nav-link" href="/">Home</a></li>',
      '<li class="nav-item"><a class="nav-link" href="/about">About</a></li>'
    ]
  }
]
const message = `Are you sure you want to clean up the project?
This will remove :
- pages
- posts
- project styles
- images
- svgs`
const validate = new PromptConfirm(message)

/**
 * Remove lines from a file
 * @param filePath        file path to update
 * @param linesToRemove   array of string to removed from file
 */
const updateFile = (filePath, linesToRemove) => {
  if (!filePath || !linesToRemove || linesToRemove.length === 0) {
    dbg('updateFile : Invalid property \'filePath\' or \'linesToRemove\'')
    return
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      dbg(`Error while attempting to read file : ${filePath}`)
    }
    let linesDatas = data.split('\n')
    for (let index = linesDatas.length - 1; index >= 0; index--) {
      const currentLine = linesDatas[index]
      const matchOne = linesToRemove.some(lineToRemove => currentLine.indexOf(lineToRemove) > -1)

      if (matchOne) {
        linesDatas.splice(index, 1)
      }
    }

    fs.writeFile(filePath, linesDatas.join('\n'), (err) => {
      if (err) {
        dbg(`Error while attempting to write file :  ${filePath}`)
        return
      }

      dbg(`${filePath} updated`)
    })
  })
}

/**
 * Update files
 * @param filesToUpdate   array of files to update
 */
const updateFiles = (filesToUpdate) => {
  filesToUpdate.forEach((fileToUpdate) => {
    updateFile(fileToUpdate.filePath, fileToUpdate.linesToRemove)
  })
}

/**
 * Remove files
 * @param filesPaths    array of files paths
 */
const removeFiles = (filesPaths) => {
  filesPaths.forEach((filePath) => {
    fs.unlink(filePath, () => {
      dbg(`${filePath} removed`)
    })
  })
}

/**
 * Main
 */
validate
  .run()
  .then((ok) => {
    if (ok) {
      removeFiles(FILES_TO_REMOVE)
      updateFiles(FILES_TO_UPDATE)
    }
  })

