import gulp from 'gulp'
import newer from 'gulp-newer'

const destPath = 'dist/public'
const sourceFilePattern = 'public/**'

gulp.task('static-files', () => gulp.src(sourceFilePattern)
  .pipe(newer(destPath))
  .pipe(gulp.dest(destPath))
)
