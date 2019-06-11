import LessPluginAutoPrefix from 'less-plugin-autoprefix'
import LessPluginCleanCSS from 'less-plugin-clean-css'
import LessPluginNpmImport from 'less-plugin-npm-import'
import filter from 'gulp-filter'
import gulp from 'gulp'
import less from 'gulp-less'
import livereload from 'gulp-livereload'
import newer from 'gulp-newer'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'

import passthrough from './passthrough'

const __DEV__ = process.env.NODE_ENV !== 'production'
const destFilename = 'app.css'
const destPath = 'public'
const sourcePath = 'styles'
const sourceFilename = `${sourcePath}/index.less`
const sourceFilePattern = [
  `${sourcePath}/**/*.less`,
  __filename,
]

gulp.task('styles', () => gulp.src(sourceFilename)
  .pipe(newer({
    dest: `${destPath}/${destFilename}`,
    extra: sourceFilePattern,
  }))
  .pipe(rename(destFilename))
  .pipe(__DEV__ ? sourcemaps.init() : passthrough())
  .pipe(less({
    plugins: [
      new LessPluginNpmImport(),
    ].concat(__DEV__ ? [] : [
      new LessPluginAutoPrefix(),
      new LessPluginCleanCSS(),
    ]),
    strictMath: true,
  }))
  .pipe(__DEV__ ? sourcemaps.write('.', {
    addComment: true,
    includeContent: false,
    sourceRoot: sourcePath,
  }) : passthrough())
  .pipe(gulp.dest(destPath))
  .pipe(filter('**/*.css'))
  .pipe(livereload())
)

gulp.task('watch:styles', () => {
  livereload.listen()
  gulp.watch(sourceFilePattern, gulp.series('styles'))
})
