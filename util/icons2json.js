const fs = require('fs');
const through = require('through2');
const DomParser = require('dom-parser');
const parser = new DomParser()

let baseName = (path) => {
    f = path.split('/')
    f = f[f.length - 1]

    ext = '.svg'
    if (f.substr(-1 * ext.length) === ext) {
        f = f.substr(0, f.length - ext.length);
    }

    return f
}

let editJSON = (func) => {

    let data = fs.readFileSync('./dist/icons.json', 'utf8')
    data = func(JSON.parse(data))
    fs.writeFileSync('./dist/icons.json', JSON.stringify(data, null, 4))

}

module.exports = opts => {

    fs.writeFileSync('./dist/icons.json', JSON.stringify({}))

    return through.obj((file, enc, cb) => {
        if (file.isNull()) {
            cb(null, file);
            return;
        }


        let name  = baseName(file.path)
        let dom   = parser.parseFromString(file.contents.toString())
        let paths = dom.getElementsByTagName('svg')[0].childNodes
        let path  = ''

        for (let i of paths) {
            if (i.nodeName != 'title' && i.nodeName != '#text') path += i.outerHTML
        }

        editJSON((d) => {
            d[name] = path
            return d
        })

        cb(null, file);
    })
}
