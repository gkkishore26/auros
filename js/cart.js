var Locale = {
  currentCurrency: 'INR',
  currentLang: 'en',
  _rates: null,
  _ratesTimestamp: 0,
  API: 'https://open.er-api.com/v6/latest/INR',

  init: function() {
    var self = this;
    var saved = localStorage.getItem('auros_currency');
    if (saved) this.currentCurrency = saved;

    // Restore cached rates
    try {
      var cached = JSON.parse(localStorage.getItem('auros_rates'));
      if (cached && cached.ts) {
        this._rates = cached.rates;
        this._ratesTimestamp = cached.ts;
      }
    } catch(e) {}

    // Fetch fresh rates if stale (>1 hour)
    var oneHour = 60 * 60 * 1000;
    if (Date.now() - this._ratesTimestamp > oneHour) {
      this.fetchRates();
    }

    // Sync custom dropdowns with saved currency
    document.querySelectorAll('.loc-select[data-loc="currency"]').forEach(function(sel) {
      var trigger = sel.querySelector('.loc-trigger');
      if (trigger) {
        trigger.setAttribute('data-value', self.currentCurrency);
        trigger.querySelector('.loc-value').textContent = self.currentCurrency + ' (' + self.getSymbol() + ')';
        sel.querySelectorAll('.loc-option').forEach(function(o) { o.classList.remove('selected'); });
        var match = sel.querySelector('.loc-option[data-value="' + self.currentCurrency + '"]');
        if (match) match.classList.add('selected');
      }
    });
  },

  fetchRates: function() {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.API, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          if (data && data.rates) {
            self._rates = data.rates;
            self._ratesTimestamp = Date.now();
            localStorage.setItem('auros_rates', JSON.stringify({ rates: data.rates, ts: self._ratesTimestamp }));
            self.updatePrices();
          }
        } catch(e) {}
      }
    };
    xhr.send();
  },

  convert: function(amount, fromCurrency) {
    fromCurrency = fromCurrency || 'INR';
    if (this.currentCurrency === fromCurrency || !this._rates) return amount;
    var fromRate = fromCurrency === 'INR' ? 1 : (this._rates[fromCurrency] || 0);
    var toRate = this.currentCurrency === 'INR' ? 1 : (this._rates[this.currentCurrency] || 0);
    if (!fromRate || !toRate) return amount;
    var raw = amount / fromRate * toRate;
    if (this.currentCurrency === 'JPY') return Math.round(raw);
    return Math.round(raw * 100) / 100;
  },

  getSymbol: function() {
    var symbols = { 'USD': '$', 'INR': '₹', 'JPY': '¥', 'EUR': '€', 'GBP': '£' };
    return symbols[this.currentCurrency] || '₹';
  },

  formatPrice: function(amount, currency) {
    var converted = this.convert(amount, currency || 'INR');
    if (this.currentCurrency === 'JPY') {
      return this.getSymbol() + ' ' + converted.toLocaleString('en-US');
    }
    if (this.currentCurrency === 'INR') {
      return this.getSymbol() + ' ' + converted.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return this.getSymbol() + ' ' + converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  updatePrices: function() {
      document.querySelectorAll('[data-amount]').forEach(function(el) {
        var amount = parseInt(el.getAttribute('data-amount'));
        if (!isNaN(amount)) {
          var isFree = amount === 0;
          var currency = el.getAttribute('data-currency') || 'INR';
          el.textContent = isFree ? (typeof Translator !== 'undefined' ? Translator.t('Free') : 'Free') : Locale.formatPrice(amount, currency);
        }
      });
      if (typeof Cart !== 'undefined' && Cart.updateUI) Cart.updateUI();
  }
};

const Cart = {
  KEY: 'ab_cart',

  checkoutPath: function() {
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    return depth > 0 ? '../checkout.html' : 'checkout.html';
  },

  assetPath(path) {
    const isSubdir = window.location.pathname.includes('/collections/') || window.location.pathname.includes('/policy/');
    return (isSubdir ? '../' : '') + path;
  },

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
    }
  },

  saveItems(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
  },

  add(product) {
    const items = this.getItems();
    const existing = items.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        currency: product.currency || 'INR'
      });
    }

    this.saveItems(items);
    this.updateUI();
    this.openDrawer();
    this.showNotification(product.name);
  },

  remove(productId) {
    let items = this.getItems();
    items = items.filter(item => item.id !== productId);
    this.saveItems(items);
    this.updateUI();
  },

  updateQuantity(productId, delta) {
    const items = this.getItems();
    const item = items.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
      this.remove(productId);
    } else {
      this.saveItems(items);
      this.updateUI();
    }
  },

  getTotal() {
    const items = this.getItems();
    return items.reduce((sum, item) => {
      var converted = Locale.convert(item.price, item.currency || 'INR');
      return sum + converted * item.quantity;
    }, 0);
  },

  getCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  formatPrice(amount, currency) {
    return Locale.formatPrice(amount, currency);
  },

  updateUI() {
    const count = this.getCount();
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });

    this.renderCartItems();
  },

  renderCartItems() {
    const drawerBody = document.querySelector('.drawer.cart-drawer .drawer-body');
    const cartFooter = document.querySelector('.drawer.cart-drawer .cart-footer');
    if (!drawerBody) return;

    const items = this.getItems();

    if (items.length === 0) {
      drawerBody.innerHTML = `
        <div class="cart-empty">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p>Your cart is currently empty. Not sure where to start?</p>
          <a href="${this.assetPath('collections/best-sellers.html')}" class="btn btn-primary btn-sm">Bestsellers</a>
        </div>
      `;
      if (cartFooter) cartFooter.innerHTML = '';
      return;
    }

    let html = '';
    items.forEach(item => {
      var itemImg = item.image || (item.images ? item.images[0] : 'placeholder.svg');
      var imageSrc = itemImg.indexOf('://') > -1 || itemImg.indexOf('//') === 0 ? itemImg : this.assetPath('assets/images/' + itemImg);
      html += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-image">
            <img src="${imageSrc}" alt="${item.name}" loading="lazy">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${this.formatPrice(item.price, item.currency)}</div>
            <div class="cart-item-actions">
              <div class="quantity-selector">
                <button class="quantity-btn" onclick="Cart.updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="Cart.updateQuantity(${item.id}, 1)">+</button>
              </div>
              <button class="cart-item-remove" onclick="Cart.remove(${item.id})">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    drawerBody.innerHTML = html;

    if (cartFooter) {
      const total = this.getTotal();
      cartFooter.innerHTML = `
        <div class="cart-total">
          <span>Subtotal</span>
          <span class="cart-total-price">${this.formatPrice(total)}</span>
        </div>
        <a href="` + Cart.checkoutPath() + `" class="btn btn-primary btn-full">Check out</a>
        <div class="cart-notes">Taxes calculated at checkout</div>
      `;
    }
  },

  openDrawer() {
    const drawer = document.querySelector('.drawer.cart-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    if (drawer) {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    if (overlay) overlay.classList.add('active');
    setTimeout(function() {
      var closeBtn = document.querySelector('.cart-drawer .drawer-close');
      if (closeBtn) closeBtn.focus();
    }, 100);
  },

  closeDrawer() {
    const drawer = document.querySelector('.drawer.cart-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  },

  showNotification(productName) {
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="cart-notification-inner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Added to cart: <strong>${productName}</strong></span>
      </div>
    `;

    Object.assign(notification.style, {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: '100',
      background: 'rgb(22 163 74)',
      color: 'white',
      padding: '0.75rem 1.25rem',
      borderRadius: '0.5rem',
      fontSize: '0.9375rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      transform: 'translateY(-100%)',
      opacity: '0',
      transition: 'transform 0.3s ease, opacity 0.3s ease'
    });

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    });

    setTimeout(() => {
      notification.style.transform = 'translateY(-100%)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  Cart.updateUI();
  Locale.init();

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    var product = {
      id: parseInt(btn.getAttribute('data-id')),
      slug: btn.getAttribute('data-slug'),
      name: btn.getAttribute('data-name'),
      price: parseInt(btn.getAttribute('data-price')),
      image: btn.getAttribute('data-image') || 'placeholder.svg',
      currency: btn.getAttribute('data-currency') || 'INR'
    };
    Auth.require(function() { Cart.add(product); });
  });

  document.addEventListener('click', function(e) {
    var toggle = e.target.closest('[data-cart-toggle]');
    if (!toggle) return;
    e.preventDefault();
    var drawer = document.querySelector('.drawer.cart-drawer');
    if (drawer && drawer.classList.contains('active')) {
      Cart.closeDrawer();
    } else {
      Cart.openDrawer();
    }
  });
});
