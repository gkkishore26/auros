var Layout = {
  currentBasePath: '',

  init: function(basePath) {
    this.currentBasePath = basePath || '';
    this.renderHeader();
    this.renderFooter();
    this.renderOverlay();
    this.renderMobileMenu();
    this.renderCartDrawer();
    this.renderSearchOverlay();
    this.renderCookieConsent();
    this.renderScrollTop();
    this.initTheme();
    this.initScrollTop();
    this.initAria();
    if (typeof Account !== 'undefined') Account.init();
    if (typeof Auth !== 'undefined') Auth.init();
  },

  path: function(relativePath) {
    return this.currentBasePath + relativePath;
  },

  renderHeader: function() {
    var container = document.getElementById('app-header');
    if (!container) return;

    container.innerHTML = `
    <header class="site-header" id="header">
      <div class="header-inner">
        <div class="header-left">
          <button class="header-mobile-toggle header-icon-btn" data-mobile-toggle aria-label="Menu" aria-expanded="false">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
          <button class="back-btn header-icon-btn" onclick="window.history.back()" aria-label="Go back">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <a href="${this.path('index.html')}" class="header-logo" aria-label="AUROS Home">
            <span class="header-logo-text">AUROS</span>
          </a>
          <nav class="header-nav" aria-label="Main navigation">
            <ul class="header-nav-list">
              <li class="header-nav-item">
                <a href="#" class="header-nav-link" aria-expanded="false" aria-controls="products-dropdown">
                  Products
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <div class="dropdown-menu" id="products-dropdown">
                  <a href="${this.path('collections/presets.html')}" class="dropdown-item">Presets</a>
                  <a href="${this.path('collections/motion-graphics.html')}" class="dropdown-item">Motion Graphic Templates</a>
                  <a href="${this.path('collections/free-assets.html')}" class="dropdown-item">Free Assets</a>
                  <a href="${this.path('collections/all.html')}" class="dropdown-item">Tutorial Assets</a>
                  <a href="${this.path('collections/project-files.html')}" class="dropdown-item">Project Files</a>
                  <a href="${this.path('collections/sound-effects.html')}" class="dropdown-item">Sound Effects</a>
                  <a href="${this.path('collections/best-sellers.html')}" class="dropdown-item">Best Sellers</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div class="header-right">
          <div class="header-localization">
            <div class="localization-select">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <div class="loc-select" data-loc="language">
                <button class="loc-trigger" type="button" data-value="en"><span class="loc-value">English</span><svg class="loc-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
                <div class="loc-dropdown">
                  <button class="loc-option" type="button" data-value="en" style="--i:0">English</button>
                  <button class="loc-option" type="button" data-value="ta" style="--i:1">தமிழ்</button>
                  <button class="loc-option" type="button" data-value="ar" style="--i:2">العربية</button>
                </div>
              </div>
            </div>
            <div class="localization-select">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <div class="loc-select" data-loc="currency">
                <button class="loc-trigger" type="button" data-value="INR"><span class="loc-value">INR (₹)</span><svg class="loc-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
                <div class="loc-dropdown">
                  <button class="loc-option" type="button" data-value="USD" style="--i:0">USD ($)</button>
                  <button class="loc-option" type="button" data-value="INR" style="--i:1">INR (₹)</button>
                  <button class="loc-option" type="button" data-value="JPY" style="--i:2">JPY (¥)</button>
                  <button class="loc-option" type="button" data-value="EUR" style="--i:3">EUR (€)</button>
                  <button class="loc-option" type="button" data-value="GBP" style="--i:4">GBP (£)</button>
                </div>
              </div>
            </div>
          </div>
          <a href="#" class="header-icon-btn account-link-desktop" aria-label="Account">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </a>
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
            <svg class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <svg class="icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          </button>
          <a href="#" class="header-icon-btn" data-search-toggle aria-label="Search" aria-expanded="false">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </a>
          <button class="header-icon-btn" data-cart-toggle aria-label="Cart" aria-expanded="false">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cart-count" style="display:none">0</span>
          </button>
        </div>
      </div>
    </header>
    `;
  },

  renderFooter: function() {
    var container = document.getElementById('app-footer');
    if (!container) return;
    container.innerHTML = `
    <footer class="site-footer">
      <div class="page-container">
        <div class="footer-grid">
          <div>
            <h4 class="footer-heading">Products</h4>
            <div class="footer-links">
              <a href="${this.path('collections/presets.html')}">Presets</a>
              <a href="${this.path('collections/motion-graphics.html')}">Motion graphic templates</a>
              <a href="${this.path('collections/free-assets.html')}">Free assets</a>
              <a href="${this.path('collections/all.html')}">Tutorial assets</a>
              <a href="${this.path('collections/project-files.html')}">Project files</a>
              <a href="${this.path('collections/best-sellers.html')}">Best sellers</a>
            </div>
          </div>
          <div>
            <h4 class="footer-heading">Pages</h4>
            <div class="footer-links">
              <a href="${this.path('faq.html')}">FAQ</a>
              <a href="${this.path('contact.html')}">Contact Us</a>
              <a href="${this.path('about.html')}">About Us</a>
              <a href="${this.path('account.html')}">Your account</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-localization">
            <div class="localization-select">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <div class="loc-select" data-loc="language">
                <button class="loc-trigger" type="button" data-value="en"><span class="loc-value">English</span><svg class="loc-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
                <div class="loc-dropdown">
                  <button class="loc-option" type="button" data-value="en" style="--i:0">English</button>
                  <button class="loc-option" type="button" data-value="ta" style="--i:1">தமிழ்</button>
                  <button class="loc-option" type="button" data-value="ar" style="--i:2">العربية</button>
                </div>
              </div>
            </div>
            <div class="localization-select">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <div class="loc-select" data-loc="country">
                <button class="loc-trigger" type="button" data-value="IN"><span class="loc-value">India (INR ₹)</span><svg class="loc-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
                <div class="loc-dropdown">
                  <button class="loc-option" type="button" data-value="US" style="--i:0">United States (USD $)</button>
                  <button class="loc-option" type="button" data-value="IN" style="--i:1">India (INR ₹)</button>
                  <button class="loc-option" type="button" data-value="JP" style="--i:2">Japan (JPY ¥)</button>
                  <button class="loc-option" type="button" data-value="DE" style="--i:3">Germany (EUR €)</button>
                  <button class="loc-option" type="button" data-value="GB" style="--i:4">United Kingdom (GBP £)</button>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-payment-icons">
            <span class="payment-icon">Amex</span>
            <span class="payment-icon">Apple</span>
            <span class="payment-icon">GPay</span>
            <span class="payment-icon">iDEAL</span>
            <span class="payment-icon">Klarna</span>
            <span class="payment-icon">Maestro</span>
            <span class="payment-icon">MC</span>
            <span class="payment-icon">M-Pay</span>
            <span class="payment-icon">PayPal</span>
            <span class="payment-icon">Shop</span>
            <span class="payment-icon">Union</span>
            <span class="payment-icon">Visa</span>
          </div>
          <div class="footer-copyright">&copy; 2026 AUROS</div>
          <div class="footer-legal">
            <a href="${this.path('policy/privacy.html')}">Privacy policy</a>
            <a href="${this.path('policy/terms.html')}">Terms of service</a>
            <a href="${this.path('policy/refund.html')}">Refund policy</a>
          </div>
          <div class="footer-legal" style="font-size:0.75rem;margin-top:0.5rem;">
            <span>Choosing a selection results in a full page refresh.</span>
            <span>Opens in a new window.</span>
          </div>
          <div class="mobile-social" style="margin-top:1rem;">
            <a href="#" aria-label="Facebook"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M17.232 4.768l-6.768 6.768"/></svg></a>
            <a href="#" aria-label="Instagram"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="#" aria-label="YouTube"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 8.02 9.75 15.98 15.5 11.88 9.75 8.02"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
    `;
  },

  renderOverlay: function() {
    var container = document.getElementById('app-overlay');
    if (!container) return;
    container.innerHTML = '<div class="drawer-overlay" onclick="Cart.closeDrawer();MobileMenu.close()"></div>';
  },

  renderCartDrawer: function() {
    var container = document.getElementById('app-cart');
    if (!container) return;
    container.innerHTML = `
    <div class="drawer cart-drawer">
      <div class="drawer-header">
        <span class="drawer-title">Cart <span class="cart-count-header">0</span></span>
        <button class="drawer-close" onclick="Cart.closeDrawer()" aria-label="Close cart">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="drawer-body">
        <div class="cart-empty">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p>Your cart is currently empty. Not sure where to start?</p>
          <a href="${this.path('collections/best-sellers.html')}" class="btn btn-primary btn-sm">Bestsellers</a>
        </div>
      </div>
      <div class="cart-footer"></div>
    </div>
    `;
  },

  renderSearchOverlay: function() {
    var container = document.getElementById('app-search');
    if (!container) return;
    container.innerHTML = `
    <div class="search-overlay">
      <div class="search-header">
        <div class="search-input-wrap">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" class="search-input" placeholder="Search products..." aria-label="Search products">
          <button class="search-clear">Clear</button>
        </div>
        <button class="drawer-close search-close" aria-label="Close search">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="search-body">
        <div class="search-results-title">Search products</div>
        <div class="search-results-grid"></div>
        <div class="search-no-results" style="display:none;">
          <p>No products found. Try a different search term.</p>
        </div>
      </div>
    </div>
    `;
  },

  renderCookieConsent: function() {
    var container = document.getElementById('app-cookie');
    if (!container) return;
    container.innerHTML = `
    <div class="cookie-consent">
      <div class="cookie-consent-inner">
        <p>We use cookies. This site uses cookies for better user experience and analytics.</p>
        <div class="cookie-actions">
          <button class="btn btn-secondary btn-sm" data-cookie-decline>Decline</button>
          <button class="btn btn-primary btn-sm" data-cookie-accept>Accept</button>
        </div>
      </div>
    </div>
    `;
  },

  renderScrollTop: function() {
    var container = document.getElementById('app-scroll-top');
    if (!container) return;
    container.innerHTML = '<button class="scroll-top" id="scrollTop" aria-label="Scroll to top"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg></button>';
  },

  renderMobileMenu: function() {
    var container = document.getElementById('app-mobile-menu');
    if (!container) return;
    container.innerHTML = `
    <div class="drawer mobile-menu">
      <div class="drawer-header">
        <span class="drawer-title">Menu</span>
        <button class="drawer-close mobile-menu-close" aria-label="Close menu">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mobile-nav-list">
          <div class="mobile-nav-item">
            <a href="#" class="mobile-nav-link mobile-nav-toggle" aria-expanded="false" aria-controls="products-mobile-sub">
              Products
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
            </a>
            <div class="mobile-sub-nav" id="products-mobile-sub">
              <a href="${this.path('collections/presets.html')}" class="mobile-sub-link">Presets</a>
              <a href="${this.path('collections/motion-graphics.html')}" class="mobile-sub-link">Motion Graphic Templates</a>
              <a href="${this.path('collections/free-assets.html')}" class="mobile-sub-link">Free Assets</a>
              <a href="${this.path('collections/all.html')}" class="mobile-sub-link">Tutorial Assets</a>
              <a href="${this.path('collections/project-files.html')}" class="mobile-sub-link">Project Files</a>
              <a href="${this.path('collections/best-sellers.html')}" class="mobile-sub-link">Best Sellers</a>
            </div>
          </div>
          <a href="${this.path('collections/presets.html')}" class="mobile-nav-link">Presets</a>
          <a href="${this.path('collections/motion-graphics.html')}" class="mobile-nav-link">Motion Graphic Templates</a>
          <a href="${this.path('collections/free-assets.html')}" class="mobile-nav-link">Free Assets</a>
          <a href="${this.path('collections/all.html')}" class="mobile-nav-link">Tutorial Assets</a>
          <a href="${this.path('collections/project-files.html')}" class="mobile-nav-link">Project Files</a>
          <a href="${this.path('collections/best-sellers.html')}" class="mobile-nav-link">Best Sellers</a>
        </div>
          <a href="#" class="mobile-nav-link account-link">Log in</a>
          <a href="${this.path('account.html')}" class="mobile-nav-link">My Account</a>
        <div class="mobile-localization">
          <select aria-label="Language">
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
            <option value="ar">العربية</option>
          </select>
          <select aria-label="Country/region">
            <option value="US">United States (USD $)</option>
            <option value="IN">India (INR ₹)</option>
            <option value="JP">Japan (JPY ¥)</option>
            <option value="DE">Germany (EUR €)</option>
            <option value="GB">United Kingdom (GBP £)</option>
          </select>
        </div>
        <div class="mobile-social">
          <a href="#" aria-label="Facebook"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" aria-label="Twitter"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M17.232 4.768l-6.768 6.768"/></svg></a>
          <a href="#" aria-label="Instagram"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="#" aria-label="YouTube"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 8.02 9.75 15.98 15.5 11.88 9.75 8.02"/></svg></a>
        </div>
      </div>
    </div>
    `;
  },

  initTheme: function() {
    var html = document.documentElement;
    var saved = localStorage.getItem('theme');
    if (saved === 'dark') html.setAttribute('data-theme', 'dark');
    var toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function() {
        var isDark = html.getAttribute('data-theme') === 'dark';
        if (isDark) { html.removeAttribute('data-theme'); localStorage.setItem('theme', 'light'); }
        else { html.setAttribute('data-theme', 'dark'); localStorage.setItem('theme', 'dark'); }
      });
    }
  },

  initScrollTop: function() {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 400) { btn.classList.add('visible'); }
      else { btn.classList.remove('visible'); }
    }, { passive: true });
    btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  },

  initAria: function() {
    var productsLink = document.querySelector('.header-nav-link');
    if (productsLink) {
      productsLink.addEventListener('click', function(e) {
        e.preventDefault();
        var expanded = this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        this.setAttribute('aria-expanded', expanded);
        var dropdown = document.getElementById('products-dropdown');
        if (dropdown) dropdown.classList.toggle('active');
      });
    }

    document.querySelectorAll('[data-search-toggle]').forEach(function(el) {
      el.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        this.setAttribute('aria-expanded', expanded);
      });
    });

    document.querySelectorAll('[data-cart-toggle]').forEach(function(el) {
      el.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        this.setAttribute('aria-expanded', expanded);
      });
    });
  }
};
