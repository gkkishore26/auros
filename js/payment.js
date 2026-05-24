/* ── Payment Configuration ── */
var PAYMENT_CONFIG = {
  mockMode: false,
  stripePublishableKey: 'pk_test_51TaWrDJgmsJ0jlCjTYdkER6plecT1jybh4C2zzHKKCi082XociWn6BiuV5gMyyWi3lfdkIpFaERWTJAXwvLdB6pJ00dvbO17QP',
  apiBaseUrl: '/api'
};

/* ── Payment Module ── */
var Payment = {
  stripeLoaded: false,
  stripeCardElement: null,
  _stripeInstance: null,
  _pendingMount: null,

  init: function() {
    if (!PAYMENT_CONFIG.mockMode) {
      this._loadScript('https://js.stripe.com/v3/', function() {
        Payment.stripeLoaded = true;
        if (Payment._pendingMount) {
          Payment._doMount(Payment._pendingMount);
          Payment._pendingMount = null;
        }
      });
    }
  },

  _loadScript: function(src, onLoad) {
    if (document.querySelector('script[src="' + src + '"]')) { onLoad(); return; }
    var s = document.createElement('script');
    s.src = src; s.async = true; s.onload = onLoad;
    document.head.appendChild(s);
  },

  _doMount: function(containerId) {
    Payment._stripeInstance = window.Stripe(PAYMENT_CONFIG.stripePublishableKey);
    var elements = Payment._stripeInstance.elements();
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    Payment.stripeCardElement = elements.create('card', {
      style: {
        base: {
          fontSize: '15px',
          color: isDark ? '#e5e5e5' : '#171717',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          '::placeholder': { color: isDark ? '#888' : '#aaa' },
          backgroundColor: 'transparent'
        },
        invalid: { color: '#dc2626' }
      }
    });
    Payment.stripeCardElement.mount('#' + containerId);
    Payment.stripeCardElement.on('change', function(e) {
      var errEl = document.getElementById('stripe-card-errors');
      if (errEl) {
        errEl.textContent = e.error ? e.error.message : '';
        errEl.style.display = e.error ? 'block' : 'none';
      }
    });
  },

  mountStripeCard: function(containerId) {
    if (this.stripeCardElement) return;
    if (this.stripeLoaded) {
      this._doMount(containerId);
      this._watchTheme(containerId);
    } else {
      this._pendingMount = containerId;
    }
  },

  _watchTheme: function(containerId) {
    var observer = new MutationObserver(function() {
      if (!Payment.stripeCardElement) return;
      Payment.stripeCardElement.destroy();
      Payment.stripeCardElement = null;
      Payment._stripeInstance = null;
      Payment._doMount(containerId);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  },

  process: function(method, amount, currency, customer, onSuccess, onError) {
    if (PAYMENT_CONFIG.mockMode) return this._mock(method, amount, currency, customer, onSuccess, onError);
    if (method === 'stripe') return this._stripe(amount, currency, customer, onSuccess, onError);
    onSuccess();
  },

  _mock: function(method, amount, currency, customer, onSuccess, onError) {
    var sym = { USD:'$',INR:'₹',EUR:'€',GBP:'£',JPY:'¥' }[currency] || '₹';
    var label = sym + amount.toLocaleString(undefined, {minimumFractionDigits:2,maximumFractionDigits:2});
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML =
      '<div style="background:#fff;border-radius:1rem;padding:2rem;max-width:400px;width:90%;text-align:center;color:#171717;font-family:-apple-system,BlinkMacSystemFont,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,0.3);">' +
        '<div style="font-size:1.375rem;font-weight:700;margin-bottom:0.25rem;">Stripe</div>' +
        '<div style="font-size:0.8rem;color:#888;margin-bottom:1.25rem;">Test mode — no real charge</div>' +
        '<div style="font-size:2rem;font-weight:700;margin-bottom:0.5rem;">' + label + '</div>' +
        '<div style="font-size:0.8rem;color:#888;margin-bottom:1.75rem;">' + customer.name + ' · ' + customer.email + '</div>' +
        '<div style="display:flex;gap:0.75rem;">' +
          '<button id="mockPayNo" style="flex:1;padding:0.75rem;border:1px solid #ddd;border-radius:0.5rem;background:#fff;color:#171717;font-size:0.9375rem;cursor:pointer;">Cancel</button>' +
          '<button id="mockPayYes" style="flex:1;padding:0.75rem;border:none;border-radius:0.5rem;background:#171717;color:#fff;font-size:0.9375rem;font-weight:600;cursor:pointer;">Pay ' + label + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.getElementById('mockPayYes').addEventListener('click', function() { document.body.removeChild(overlay); onSuccess(); });
    document.getElementById('mockPayNo').addEventListener('click', function() { document.body.removeChild(overlay); if (onError) onError('Payment cancelled'); });
  },

  _stripe: function(amount, currency, customer, onSuccess, onError) {
    if (!this.stripeLoaded) { onError('Stripe failed to load'); return; }
    var self = this;
    var stripe = this._stripeInstance;
    fetch(PAYMENT_CONFIG.apiBaseUrl + '/create-payment-intent', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(amount * 100), currency: currency.toLowerCase(), customer: customer })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      return stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: self.stripeCardElement }
      });
    })
    .then(function(result) {
      if (result.error) onError(result.error.message); else onSuccess();
    })
    .catch(function(err) { onError(err.message); });
  },

};
