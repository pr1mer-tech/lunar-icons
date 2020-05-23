const seq = require('gulp4-run-sequence');
const json = require('./util/icons2json');
const config = require('./util/config.js');

// const browserify = require('browserify');
// const source = require('vinyl-source-stream')
var browserify = require('gulp-browserify');

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const header = require('gulp-header');
const uglify = require('gulp-uglify-es').default;

const pkg = require('./package.json');
const head = `/*!
 * ${pkg.name} - ${pkg.version} - (https://lucasgruwez.github.io/${pkg.name})
 * Copyright ${new Date().getFullYear()} Lucas Gruwez.
 * Licensed under ${pkg.license}
 * https://github.com/lucasgruwez/${pkg.name}
 */

`


gulp.task('default', () => {
    seq('json', 'browserify', 'minify', 'docs')
})

gulp.task('docs', () => {
    config()
    return gulp.src('*')
})

gulp.task('browserify', () => {

	return gulp.src(['./src/index.js'])
        .pipe(browserify())
		.pipe(header(head))
        .pipe(rename('lunar-icons.js'))
        .pipe(gulp.dest('./dist'))

})

gulp.task('minify', () => {
    return gulp.src(['./dist/lunar-icons.js'])
        .pipe(uglify())
		.pipe(header(head))
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
