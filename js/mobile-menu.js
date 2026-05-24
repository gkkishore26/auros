const MobileMenu = {
  open() {
    const drawer = document.querySelector('.drawer.mobile-menu');
    const overlay = document.querySelector('.drawer-overlay');
    if (drawer) {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    if (overlay) overlay.classList.add('active');
    const toggle = document.querySelector('[data-mobile-toggle]');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  },

  close() {
    const drawer = document.querySelector('.drawer.mobile-menu');
    const overlay = document.querySelector('.drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    const toggle = document.querySelector('[data-mobile-toggle]');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
};

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    var toggle = e.target.closest('[data-mobile-toggle]');
    if (toggle) {
      e.preventDefault();
      MobileMenu.open();
      return;
    }

    var closeBtn = e.target.closest('.mobile-menu-close');
    if (closeBtn) {
      MobileMenu.close();
      return;
    }

    var overlay = e.target.closest('.drawer-overlay');
    if (overlay) {
      MobileMenu.close();
      return;
    }

    var navToggle = e.target.closest('.mobile-nav-toggle');
    if (navToggle) {
      e.preventDefault();
      var subNav = navToggle.nextElementSibling;
      var icon = navToggle.querySelector('.icon');

      if (subNav && subNav.classList.contains('mobile-sub-nav')) {
        subNav.classList.toggle('open');
        var isOpen = subNav.classList.contains('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        if (icon) {
          icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
      return;
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      MobileMenu.close();
      Cart.closeDrawer();
      Search.close();
    }
  });
});
