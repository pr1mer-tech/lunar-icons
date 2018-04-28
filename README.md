# Lunar Icons

<p align="center">
    <img src="docs/img/black/logo-v1.0.0.png" width="300"/>
</p>

<p align="center">
    <a href="https://github.com/lucasgruwez/lunar-icons/releases">
        <img src="https://img.shields.io/github/release/lucasgruwez/lunar-icons.svg" alt="GitHub release" data-pin-nopin="true">
    </a>
    <a href="https://github.com/lucasgruwez/lunar-icons/releases">
        <img src="https://img.shields.io/github/downloads/lucasgruwez/lunar-icons/total.svg" alt="Github All Releases" data-pin-nopin="true">
    </a>
    <a href="LICENSE">
        <img src="https://img.shields.io/github/license/lucasgruwez/lunar-icons.svg" alt="License" data-pin-nopin="true">
    </a>
    <a href="">
        <img src="https://img.shields.io/david/dev/lucasgruwez/lunar-icons.svg" alt="David" data-pin-nopin="true">
    </a>
    <a href="https://travis-ci.org/lucasgruwez/lunar-icons">
        <img src="https://img.shields.io/travis/lucasgruwez/lunar-icons.svg" alt="Travis" data-pin-nopin="true">
    </a>
    <a href="http://gulpjs.com/">
        <img src="https://img.shields.io/badge/Built%20with-Gulp-%23CF4646.svg" alt="Built with Gulp" data-pin-nopin="true">
    </a>
</p>

A set of beautiful handcrafted SVG icons.

![Features](features.png)

## Getting Started

Lunar Icons is a set of SVG icons that can be used in your html page. You can download them from this repo, and use them either inline, inside an `<img/>` tag, or any other way you would use SVG files.

To make the process of using these icons a bit easier, we wrote some JS that will automatically replace them for you.

#### Get script

You can either download `lunar-icons.js` or `lunar-icons.min.js` from the `./dist/` folder in this repository, or you can include them via a CDN.

```html
<script src="../path/to/lunar-icons.min.js"></script>
<!-- Or if you decide to use a CDN -->
<script src="https://unpkg.com/lunar-icons/dist/lunar-icons.min.js"></script>
```

#### Use icon

To use an icon, use the following code, and add the name of the icon you'd like to use in the data-icon attribute.

```html
<i data-icon="sheild"></i>
```

#### Replace icons

All `<i>` tags will be replaced by SVG on load, but any additional icons you add after the page has loaded will not be replaced. To replace them, use the following JavaScript snippet:

```js
lunarIcons.replace()
```

Any class or id that you add to an icon before replacing it will be kept on the replaced SVG. We will also add the `.lunar-icons` class to all SVGs.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/lucasgruwez/waffle-grid/tags).

## Authors

- **Lucas Gruwez** - *Author* - [@lucasgruwez](https://github.com/lucasgruwez)

See also the list of [contributors](https://github.com/lucasgruwez/waffle-grid/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

Copyright &copy; 2018 @lucasgruwez All Rights Reserved.
