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
    this.toggleMenu   = this.toggleMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this._addEventListeners();
    this.handleResize();
  }

  _addEventListeners() {
    for (var i = 0; i < this.linkEl.length; i++) {
      this.linkEl[i].addEventListener('click', this.hideMenu);
    }
    this.toggleEl.addEventListener('click', this.toggleMenu);
    window.addEventListener('resize', this.handleResize);
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
}


new navMenu();
