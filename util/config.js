const fs = require('fs');
const zlib = require('zlib');
const pkg = require('../package.json');
const icons = require('../dist/icons.json');

module.exports = () => {

	/*
	* calculate size of lunar-icons minified and gziped
	*/

	let inp = fs.readFileSync('./dist/lunar-icons.min.js')
	let gzipSize = Math.floor(zlib.gzipSync(inp).toString().length / 1024)

	/*
	* Get lunar-icons version
	*/

	let v = `v${pkg.version}`

	/*
	* get number of icons rounded to 50
	*/

	let n = Math.floor(Object.keys(icons).length / 50) * 50

	console.log(v, `${n}+ icons in ${gzipSize}kb`)

	/*
	* get config file
	*/

	let cfg = fs.readFileSync('./docs/_config.yml')

	let newCfg = ''

	for (let i of cfg.toString().split('\n') ) {

		if (i.indexOf('version:') > -1) {
			newCfg += `version:     ${v}\n`
		} else if (i.indexOf('gzip:') > -1) {
			newCfg += `gzip:        ${gzipSize}kb\n`
		} else if (i.indexOf('icons:') > -1) {
			newCfg += `icons:       ${n}+\n`
		} else {
			newCfg += i + '\n'
		}

	}

	fs.writeFileSync('./docs/_config.yml', newCfg)

}
