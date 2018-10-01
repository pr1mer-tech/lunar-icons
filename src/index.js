import icon from './icon.js';
const icons = Object.keys( require('../dist/icons.json') )

require('./web-components.js')()

/* =============================================================================
 * Function used to replace icons by svg
 * ========================================================================== */

/**
 * Replace all <i> tags by svgs
 */

const replace = () => {

    if (typeof document === 'undefined') {
        throw new Error('Replacing icons only works in the browser.')
    }

    if (!document.body.classList.contains('lunar')) {
        document.head.innerHTML += `<style>
            .lunar-icons {width: 1em; min-width: 1em; height: 1em; min-height: 1em}
            </style>`
        document.body.classList.add('lunar')
    }

    const iconElements = document.querySelectorAll('i[data-icon]');

    Array.from(iconElements).forEach(i => {
        const name = i.getAttribute('data-icon');

        if (icons.includes(name)) {
            attr = {}
            if (i.id != '') attr.id = i.id
            if (i.classList.contains('lunar-icons')) i.classList.remove('lunar-icons')
            if (i.classList.length > 0) attr.class = i.classList.toString()

            i.parentNode.replaceChild(new icon(name).toSVG(attr), i);
        }

    })
};

window.lunarIcons = { icon, icons, replace }

document.addEventListener('DOMContentLoaded', lunarIcons.replace)
