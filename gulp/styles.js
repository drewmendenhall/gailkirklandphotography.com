import LessPluginAutoPrefix from 'less-plugin-autoprefix'
import LessPluginCleanCSS from 'less-plugin-clean-css'
import LessPluginNpmImport from 'less-plugin-npm-import'
import filter from 'gulp-filter'
import gulp from 'gulp'
import less from 'gulp-less'
import newer from 'gulp-newer'
import livereload from 'gulp-livereload'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'

const destFilename = 'app.css'
const destPath = 'public'
const sourceFile = 'styles/index.less'
const sourceFilePattern = [
  '.env',
  'styles/**/*.less',
  __filename,
]

gulp.task('styles', () => gulp.src(sourceFile)
  .pipe(newer({
    dest: `${destPath}/${destFilename}`,
    extra: sourceFilePattern,
  }))
  .pipe(rename(destFilename))
  .pipe(sourcemaps.init())
  .pipe(less({
    plugins: [
      new LessPluginNpmImport(),
    ].concat(PROD ? [
      new LessPluginAutoPrefix(),
      new LessPluginCleanCSS(),
    ] : []),
    strictMath: true,
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(destPath))
  .pipe(filter('**/*.css'))
  .pipe(livereload())
)

gulp.task('watch:styles', () => {
  livereload.listen()
  gulp.watch(sourceFilePattern, ['styles'])
})
