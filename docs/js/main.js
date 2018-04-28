/*
 * Scroll down to main when down cheveron is clicked
 */

document.querySelector('.scroll').addEventListener('click', () => {
    document.querySelector('main').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

/*
 * Add all icons to page
 */

for (i of lunarIcons.icons) {

    let d = document.createElement('div')
    d.setAttribute('class', 'icon')
    d.title = i
    d.append(new lunarIcons.icon(i).toSVG())

    // Listen for click and write to popup
    d.addEventListener('click', e => {
        let target = e.target
        while (!target.hasAttribute('title')) {target = target.parentNode}
        let icon = target.title
        let popup = document.getElementById('popup');

        popup.innerHTML = `
            <i data-icon="${icon}"></i>
            <code>&lt;i data-icon="${icon}"&gt;&lt;/i&gt;</code>
        `

        lunarIcons.replace()
        popup.classList.add('visible')
    })

    document.querySelector('#icons .icon-wrapper').append(d)
}

/*
* remove popup if clicked outside popup or icons
*/

let isDesendant = (parent, child) => {

    let node = child
    while (node != document.body) {
        if (node == parent) return true
        node = node.parentNode
    }
    return false

}

let isIcon = e => {

    let node = e
    while (node != document.body) {
        if (node.classList.contains('icon')) return true
        node = node.parentNode
    }
    return false

}

document.body.addEventListener('click', e => {

    let popup = document.getElementById('popup')
    if (isIcon(e.target)) return
    if (isDesendant(popup, e.target)) return
    else document.getElementById('popup').classList.remove('visible')

})

/*
 * check if an icon is searched for or not
 */

let check = name => {
    let query = document.querySelector('input[type="search"]').value

    name = name.replace('_', '')
    query = query.toLowerCase().replace(/[^a-z]/g, '')

    if (query == '') return true
    if (name.indexOf(query) > -1) return true
    return false
}

let updateIcons = () => {
    for (i of document.querySelectorAll('.icon')) {
        i.hidden = !check(i.title)
    }
}

document.querySelector('input[type="search"]').addEventListener('input', updateIcons)

/*
 * Adjust icon wrapper width to fit as much icons as possible without wasting space
 */

let wrap = () => {
    let iW = document.body.clientWidth <= 840 ? 72 : 112;
    let w = Math.min(document.body.clientWidth*.8, 960)
    w = Math.floor(w / iW) * iW

    let containers = document.querySelectorAll('.container, .icon-wrapper')
    for (let c of containers) c.style.width = w + 'px'
}

wrap()

window.addEventListener('resize', wrap)

/*
 * Add year to copyright
 */

document.querySelector('.y').innerHTML = new Date().getFullYear()
