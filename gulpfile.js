const seq = require('run-sequence');
const json = require('./util/icons2json');
const config = require('./util/config.js');

const browserify = require('browserify');
const source = require('vinyl-source-stream')

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;

gulp.task('default', () => {
    seq('json', 'browserify', 'minify', 'docs')
})

gulp.task('docs', config)

gulp.task('browserify', () => {

	var b = browserify()
	b.add('./src/index.js')
	b.bundle()
		.pipe(source('lunar-icons.js'))
		.pipe(gulp.dest('./dist'))

})

gulp.task('minify', () => {
    return gulp.src(['./dist/lunar-icons.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'))
})

gulp.task('json', () => {
    return gulp.src('./src/icons/*.svg')
        .pipe(svgmin({
            plugins: [
                {cleanupIDs: false}
            ]
        }))
        .pipe(json())
});
