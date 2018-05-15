const icon = require('../src/icon.js');
const icons = Object.keys( require('../dist/icons.json') );

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
