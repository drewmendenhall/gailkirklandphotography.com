import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import livereload from 'gulp-livereload'
import newer from 'gulp-newer'

const destPath = 'public/images'
const sourceFilePattern = [
  '.env',
  'images/**',
  __filename,
]

gulp.task('images', () => gulp.src(sourceFilePattern)
  .pipe(newer(destPath))
  .pipe(imagemin())
  .pipe(gulp.dest(destPath))
  .pipe(livereload())
)

gulp.task('watch:images', () => {
  livereload.listen()
  gulp.watch(sourceFilePattern, ['images'])
})
