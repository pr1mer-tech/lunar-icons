/*!
 * lunar-icons - 2.1.2 - (https://lucasgruwez.github.io/lunar-icons)
 * Copyright 2019 Lucas Gruwez.
 * Licensed under MIT
 * https://github.com/lucasgruwez/lunar-icons
 */

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "alarm": "<circle cx=\"12\" cy=\"14\" r=\"8\"/><path d=\"M7.79 3.84a11 11 0 0 0-4.94 4.05m13.36-4.05a11 11 0 0 1 4.94 4.05M12 9v5l3 3\"/>",
    "alarm_add": "<circle cx=\"12\" cy=\"14\" r=\"8\"/><path d=\"M7.79 3.84a11 11 0 0 0-4.94 4.05m13.36-4.05a11 11 0 0 1 4.94 4.05M12 10v8m-4-4h8\"/>",
    "alarm_off": {
        "path": "<path d=\"M2 4l18 18\"/><circle cx=\"12\" cy=\"14\" r=\"8\"/><path d=\"M4.22 6.22a11 11 0 0 0-1.37 1.67m13.36-4.05a11 11 0 0 1 4.94 4.05\"/>",
        "mask": "<path d=\"M.75 0l24 24\" stroke=\"#000\"/>"
    },
    "align_center": "<path d=\"M4 6h16M6 10h12M4 14h16M5.5 18h13\"/>",
    "align_justify": "<path d=\"M4 6h16M4 10h16M4 14h16M4 18h16\"/>",
    "align_left": "<path d=\"M4 6h16M4 10h12M4 14h16M4 18h13\"/>",
    "align_right": "<path d=\"M4 6h16M8 10h12M4 14h16M7 18h13\"/>",
    "apple": "<path d=\"M10 22c2-1 3-1 5 0 3 1 5-5 5-5-3-3-3-5-.5-8C17 6 13 7 12 8c-1-1-8-3-8 5 0 5 4 10 6 9zm2-15c0-3 2-5 4-5 0 3-2 5-4 5\"/>",
    "arrow_down": "<path d=\"M6 12l6 6 6-6m-6-6v12\"/>"
}
},{}],2:[function(require,module,exports){
const icons = require('../dist/icons.json');
const defaults = {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    width: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linejoin": "round"
}

/* =============================================================================
 * Define icon class, which will generate icons from JSON
 * ========================================================================== */


module.exports = class Icon {

    /**
     * Get necessary info about icon
     * @param  {string} name Icon name
     * @return {object}      contains name, path and attributes
     */

    constructor(name) {

        if (icons[name] == undefined) {
            console.error(`No icon with name: ${name}`);
            return null
        }

        this.name = name
        this.attr = defaults
		if (typeof icons[name] == 'string') {
			this.path = icons[name]
		} else {
			this.path = `<defs><mask id="mask-${name}"><rect width="100%" height="100%" fill="white"/>${icons[name].mask}</mask></defs><g mask="url(#mask-${name})">${icons[name].path}</g>`
		}
    }

    /**
     * Generate an icon's SVG
	 * @param  {object}      attr Attributes to add to SVG
     * @return {HTMLElement}      HTMLElement of SVG
     */

    toSVG(attr) {
        if (typeof document === 'undefined') {
            throw new Error('Icon.toSVG() only works in the browser.')
        }

        attr = Object.assign({}, this.attr, attr)
        if (attr.class) attr.class += ' lunar-icons'
        else attr.class = 'lunar-icons'

        let attributes = ''
        for (let a in attr) attributes += `${a}="${attr[a]}" `

        let str = `<svg ${attributes}>${this.path}</svg>`

        let svg = new DOMParser().parseFromString(str,'image/svg+xml')
        let element = svg.querySelector('svg')

        return element
    }

    /**
     * Output path
     * @return {string} path
     */

    toString() {
        return this.toSVG().toString()
    }
}

},{"../dist/icons.json":1}],3:[function(require,module,exports){
const icon = require('./icon.js')
const icons = Object.keys( require('../dist/icons.json') )

require('./web-components.js')()

/* =============================================================================
 * Function used to replace icons by svg
 * ========================================================================== */

/**
 * Replace all <i> tags by svgs
 */

let replace = () => {

    if (typeof document === 'undefined') {
        throw new Error('Replacing icons only works in the browser.')
    }

    if (!document.body.classList.contains('lunar')) {
        document.head.innerHTML += `<style>
            .lunar-icons {width: 1em; min-width: 1em; height: 1em; min-height: 1em}
            </style>`
        document.body.classList.add('lunar')
    }

    let iconElements = document.querySelectorAll('i[data-icon]')

    Array.from(iconElements).forEach(i => {
        let name = i.getAttribute('data-icon')

        if (icons.indexOf(name) > -1) {
            attr = {}
            if (i.id != '') attr.id = i.id
            if (i.classList.contains('lunar-icons')) i.classList.remove('lunar-icons')
            if (i.classList.length > 0) attr.class = i.classList.toString()

            i.parentNode.replaceChild(new icon(name).toSVG(attr), i);
        }

    })
}

window.lunarIcons = { icon, icons, replace }

document.addEventListener('DOMContentLoaded', lunarIcons.replace)

},{"../dist/icons.json":1,"./icon.js":2,"./web-components.js":4}],4:[function(require,module,exports){
const icon = require('../src/icon.js');
const icons = Object.keys( require('../dist/icons.json') );

const createCustomEl = () => {

	let script = document.createElement('script')
	script.src = 'https://unpkg.com/@webcomponents/custom-elements@1.1.0/custom-elements.min.js'

	document.head.append(script)

	if (!document.body.classList.contains('lunar')) {
		document.head.innerHTML += `<style>
		.lunar-icons {width: 1em; min-width: 1em; height: 1em; min-height: 1em}
		</style>`
		document.body.classList.add('lunar')
	}

	script.onload = () => {
		class Lunar extends HTMLElement {
			static get observedAttributes() {
				return ['icon'];
			}

			get icon() {
				return this.getAttribute('icon')
			}

			set icon(val) {
				this.setAttribute('icon', val)
				this.setSVG()
			}

			constructor() {
				super();
			}

			attributeChangedCallback(i,o,n) {
				this.setSVG(n);
			}

			setSVG(a) {
				let iconName =  a ? a : this.icon;
				this.innerHTML = '';
				this.append(new icon(iconName).toSVG())
			}
		}
		customElements.define('lunar-icon', Lunar);
	}

	window.lunarIcons = { icon, icons }

}

module.exports = createCustomEl;

},{"../dist/icons.json":1,"../src/icon.js":2}]},{},[3]);
