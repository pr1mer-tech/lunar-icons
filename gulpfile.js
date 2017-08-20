const svgmin = require('gulp-svgmin');
const gulp = require('gulp');

gulp.task('default', function () {
  return gulp.src('src/icons/svg/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('dist/svg/'))
})
