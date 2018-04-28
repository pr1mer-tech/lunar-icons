const gulp = require('gulp');
const shell = require('shelljs');
const svgmin = require('gulp-svgmin');
const rename = require("gulp-rename");
const json = require('./util/icons2json');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify-es').default;

gulp.task('default', () => {
    runSequence('json', 'browserify', 'minify', 'docs')
})

gulp.task('docs', () => {
    shell.exec('node ./util/config.js') // This will update _config.yml to have correct number of icons & correct gzip size
})

gulp.task('browserify', () => {
    shell.exec('browserify ./src/index.js -o dist/lunar-icons.js')
})

gulp.task('minify', () => {
    return gulp.src('./dist/lunar-icons.js')
        .pipe(uglify())
        .pipe(rename('lunar-icons.min.js'))
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
