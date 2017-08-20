class navMenu {
  constructor() {
    this.linkEl   = document.querySelectorAll('nav ul li a');
    this.toggleEl = document.querySelector('#menuToggle');
    this.menuEl   = document.querySelector('nav ul');
    this.headerEl = document.querySelector('header');
    this.footerEl = document.querySelector('footer');
    this.mainEl   = document.querySelector('main');

    this.viewportW    = window.innerWidth;
    this.isVisible    = false;

    this.showMenu     = this.showMenu.bind(this);
    this.hideMenu     = this.hideMenu.bind(this);
    this.linkClick    = this.linkClick.bind(this)
    this.toggleMenu   = this.toggleMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this._addEventListeners();
    this.handleResize();
  }

  _addEventListeners() {
    for (var i = 0; i < this.linkEl.length; i++) {
      this.linkEl[i].addEventListener('click', this.linkClick);
    }
    this.toggleEl.addEventListener('click', this.toggleMenu);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  }

  _contentInert(bool) {
    this.headerEl.inert = bool;
    this.footerEl.inert = bool;
    this.mainEl.inert   = bool;
  }

  handleResize() {
    this.viewportW = window.innerWidth;

    if (this.viewportW > 840) {
      this.showMenu();
      this._contentInert(false);
    } else {
      this.menuEl.classList.remove('animate');
      this.hideMenu();
    }
  }

  handleScroll() {
    this.viewportW = window.innerWidth;

    if (this.viewportW < 840) {
      this.menuEl.classList.remove('animate');
      this.hideMenu();
      this._contentInert(false);
    }
  }

  showMenu() {
    this.menuEl.classList.add('animate');
    this.menuEl.classList.add('visible');
    this.menuEl.inert   = false;
    this.isVisible      = true;
    this._contentInert(true);
  }

  hideMenu() {
    this.menuEl.classList.remove('visible');
    this.menuEl.inert   = true;
    this.isVisible      = false;
    this._contentInert(false);
  }

  toggleMenu() {
    if (this.isVisible === true) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }

  linkClick() {
    this.viewportW = window.innerWidth;
    if (this.viewportW < 840) {
      this.hideMenu();
    }
  }
}


new navMenu();
