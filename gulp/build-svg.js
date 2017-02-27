import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import svgstore from 'gulp-svgstore'
import path from 'path'
import del from 'del'
import rename from "gulp-rename"

const SVG_PATHS = './src/src-svg/*.svg'
const SVG_SPRITE_PATH_FILENAME = 'svg.html'
const SVG_SPRITE_PATH = './src/_includes'

gulp.task('clean-svg', () => {
  return del(SVG_SPRITE_PATH + SVG_SPRITE_PATH_FILENAME, {
    force: true
  })
})

gulp.task('build-svg', ['clean-svg'], () => {
  return gulp.src(SVG_PATHS)
    .pipe(svgmin((file) => {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }, {
            removeTitle: true
          }, {
            removeViewBox: false
          }, {
            removeUselessStrokeAndFill: true
          }, {
            removeAttrs:{
              attrs: [
                'fill',
                'fill-rule',
                'clip-rule',
                'sketch:type',
                'sketch:type',
                'xmlns:sketch',
                'xmlns:xlink'
              ]
            }
          }
        ]
      }
    }))
    .pipe(rename(function (path) {
      path.basename = 'icon-' + path.basename;
    }))
    .pipe(svgstore({
      cleanupdefs: true,
      includeTitleElement: false,
      id: 'base-icon-',
      inlineSvg: true
    }))
    .pipe(rename(SVG_SPRITE_PATH_FILENAME))
    .pipe(gulp.dest(SVG_SPRITE_PATH));
});
