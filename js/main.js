document.addEventListener('DOMContentLoaded', function() {
  // Init translator
  if (typeof Translator !== 'undefined') Translator.init();

  /* Cookie Consent */
  const cookieConsent = document.querySelector('.cookie-consent');
  if (cookieConsent && !localStorage.getItem('ab_cookie_consent')) {
    setTimeout(() => cookieConsent.classList.add('active'), 500);

    cookieConsent.querySelector('[data-cookie-accept]')?.addEventListener('click', function() {
      localStorage.setItem('ab_cookie_consent', 'accepted');
      cookieConsent.classList.remove('active');
    });

    cookieConsent.querySelector('[data-cookie-decline]')?.addEventListener('click', function() {
      localStorage.setItem('ab_cookie_consent', 'declined');
      cookieConsent.classList.remove('active');
    });
  }

  /* Recently Viewed */
  const recentlyViewedKey = 'ab_recently_viewed';

  function addRecentlyViewed(productId) {
    let viewed = [];
    try {
      viewed = JSON.parse(localStorage.getItem(recentlyViewedKey)) || [];
    } catch { viewed = []; }

    viewed = viewed.filter(id => id !== productId);
    viewed.unshift(productId);
    if (viewed.length > 10) viewed = viewed.slice(0, 10);
    localStorage.setItem(recentlyViewedKey, JSON.stringify(viewed));
  }

  const productId = document.querySelector('[data-product-id]')?.dataset.productId;
  if (productId) addRecentlyViewed(productId);

  /* Header scroll effect */
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header?.classList.add('header-scrolled');
    } else {
      header?.classList.remove('header-scrolled');
    }
  }, { passive: true });

  /* Custom Language / Currency selector dropdowns */
  document.addEventListener('click', function(e) {
    // Open/close dropdown
    var trigger = e.target.closest('.loc-trigger');
    if (trigger) {
      e.stopPropagation();
      var select = trigger.closest('.loc-select');
      var wasActive = select.classList.contains('active');
      // Close all other dropdowns
      document.querySelectorAll('.loc-select.active').forEach(function(s) {
        s.classList.remove('active');
      });
      if (!wasActive) select.classList.add('active');
      return;
    }

    // Select option
    var option = e.target.closest('.loc-option');
    if (option) {
      e.stopPropagation();
      var select = option.closest('.loc-select');
      var trigger = select.querySelector('.loc-trigger');
      var value = option.getAttribute('data-value');
      var label = option.textContent;
      trigger.setAttribute('data-value', value);
      trigger.querySelector('.loc-value').textContent = label;
      select.querySelectorAll('.loc-option').forEach(function(o) { o.classList.remove('selected'); });
      option.classList.add('selected');
      select.classList.remove('active');

      // Persist and notify
      var loc = select.getAttribute('data-loc');
      if (loc === 'language') {
        localStorage.setItem('auros_lang', value);
        if (typeof Translator !== 'undefined') {
          Translator.currentLang = value;
          Translator.translatePage();
        }
      } else if (loc === 'currency') {
        localStorage.setItem('auros_currency', value);
        if (typeof Locale !== 'undefined') {
          Locale.currentCurrency = value;
          Locale.updatePrices();
        }
      } else if (loc === 'country') {
        var currencyMap = { 'US': 'USD', 'IN': 'INR', 'JP': 'JPY', 'DE': 'EUR', 'GB': 'GBP' };
        var newCurrency = currencyMap[value] || 'USD';
        localStorage.setItem('auros_currency', newCurrency);
        document.querySelectorAll('.loc-select[data-loc="currency"]').forEach(function(s) {
          var t = s.querySelector('.loc-trigger');
          t.setAttribute('data-value', newCurrency);
          t.querySelector('.loc-value').textContent = newCurrency + ' (' + { 'USD': '$', 'INR': '₹', 'JPY': '¥', 'EUR': '€', 'GBP': '£' }[newCurrency] + ')';
          s.querySelectorAll('.loc-option').forEach(function(o) { o.classList.remove('selected'); });
          var match = s.querySelector('.loc-option[data-value="' + newCurrency + '"]');
          if (match) match.classList.add('selected');
        });
        if (typeof Locale !== 'undefined') {
          Locale.currentCurrency = newCurrency;
          Locale.updatePrices();
        }
      }
      return;
    }

    // Close all dropdowns on outside click
    document.querySelectorAll('.loc-select.active').forEach(function(s) {
      s.classList.remove('active');
    });
  });
});
