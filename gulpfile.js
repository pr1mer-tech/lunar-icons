const seq = require('run-sequence');
const json = require('./util/icons2json');
const config = require('./util/config.js');

const browserify = require('browserify');
const source = require('vinyl-source-stream')

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const header = require('gulp-header');
const uglify = require('gulp-uglify-es').default;
const csso = require('gulp-csso');

const pkg = require('./package.json');
const head = `/*!
 * ${pkg.name} - ${pkg.version} - (https://lucasgruwez.github.io/${pkg.name})
 * Copyright ${new Date().getFullYear()} Lucas Gruwez.
 * Licensed under ${pkg.license}
 * https://github.com/lucasgruwez/${pkg.name}
 */

`
const fs = require('fs');
const path = require('path')

gulp.task('default', () => {
	seq('json', 'browserify', 'CSS', 'minify', 'docs')
})

gulp.task('docs', config)

gulp.task("CSS", () => {
	function string_src(filename, string) {
		const src = require('stream').Readable({
			objectMode: true
		});
		src._read = function() {
			this.push(new gutil.File({
				cwd: "",
				base: "",
				path: filename,
				contents: new Buffer(string)
			}))
			this.push(null)
		}
		return src
	}
	let css = ""
	fs.readdir('./src/icons/', (err, files) => {
		files.forEach(name => {
			const svg = fs.readFileSync(name).toString().replace(/(\r\n\t|\n|\r\t)/gm,"") // remove line breaks
			const icon = path.basename(name, '.svg') // removes extension
			css += `lunar-icon[icon="${icon}"] {content: url(data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)});}`
		})
	})
	return string_src("lunar-icons.min.css",css)
		.pipe(csso())
		.pipe(gulp.dest('./dist'))
})
gulp.task('browserify', () => {

	const b = browserify();
	b.add('./src/index.js')
	b.bundle()
		.pipe(source('lunar-icons.js'))
		.pipe(header(head))
		.pipe(gulp.dest('./dist'))

})

gulp.task('minify', () => {
	return gulp.src(['./dist/lunar-icons.js'])
		.pipe(uglify())
		.pipe(header(head))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist'))
})

gulp.task('json', () => {
	return gulp.src('./src/icons/*.svg')
		.pipe(svgmin({
			plugins: [{
				cleanupIDs: false
			}]
		}))
		.pipe(json())
});
