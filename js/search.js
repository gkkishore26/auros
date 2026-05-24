const ADMIN_PASSWORD = 'KISHORE@26032006';

const Search = {
  assetPath(path) {
    const isSubdir = window.location.pathname.includes('/collections/') || window.location.pathname.includes('/policy/');
    return (isSubdir ? '../' : '') + path;
  },

  open() {
    const overlay = document.querySelector('.search-overlay');
    const input = overlay?.querySelector('.search-input');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input?.focus(), 100);
    }
  },

  close() {
    const overlay = document.querySelector('.search-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  perform(query) {
    if (query === ADMIN_PASSWORD) {
      Search.close();
      window.location.href = Search.assetPath('admin.html');
      return;
    }

    const resultsContainer = document.querySelector('.search-results-grid');
    const title = document.querySelector('.search-results-title');
    const noResults = document.querySelector('.search-no-results');

    if (!query || query.length < 2) {
      if (resultsContainer) resultsContainer.innerHTML = '';
      if (title) title.textContent = 'Search products';
      if (noResults) noResults.style.display = 'none';
      return;
    }

    const q = query.toLowerCase();
    const products = window.__PRODUCTS__ || [];

    const matches = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    if (title) {
      title.textContent = matches.length
        ? `Showing ${Math.min(matches.length, 8)} of ${matches.length} results`
        : 'No results found';
    }

    if (noResults) {
      noResults.style.display = matches.length ? 'none' : 'block';
    }

    if (resultsContainer) {
      if (matches.length === 0) {
        resultsContainer.innerHTML = '';
        return;
      }

      let html = '';
      const show = matches.slice(0, 8);

      show.forEach(product => {
        const imgVal = product.image || (product.images ? product.images[0] : null);
        const imageSrc = imgVal && (imgVal.indexOf('://') > -1 || imgVal.indexOf('//') === 0)
          ? imgVal
          : Search.assetPath('assets/images/' + (imgVal || 'placeholder.svg'));
        const priceText = product.price === 0
          ? 'Free'
          : 'Rs. ' + product.price.toLocaleString('en-IN') + '.00';
        const priceClass = product.price === 0 ? 'free' : '';

        html += `
          <a href="${Search.assetPath('product.html')}?slug=${product.slug}" class="product-card" onclick="Search.close()">
            <div class="product-card-image">
              <img src="${imageSrc}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-card-body">
              <div class="product-card-title">${product.name}</div>
              <div class="product-card-price ${priceClass}" data-amount="${product.price}" data-currency="${product.currency || 'INR'}">${priceText}</div>
            </div>
          </a>
        `;
      });

      resultsContainer.innerHTML = html;
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    var toggle = e.target.closest('[data-search-toggle]');
    if (toggle) {
      e.preventDefault();
      Search.open();
    }
  });

  var searchOverlay = document.querySelector('.search-overlay');
  if (searchOverlay) {
    searchOverlay.querySelector('.search-close')?.addEventListener('click', Search.close);

    var input = searchOverlay.querySelector('.search-input');
    if (input) {
      var debounceTimer;
      input.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        var val = this.value;
        debounceTimer = setTimeout(function() { Search.perform(val); }, 300);
      });

      input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') Search.close();
      });
    }

    searchOverlay.querySelector('.search-clear')?.addEventListener('click', function() {
      var inp = searchOverlay.querySelector('.search-input');
      if (inp) {
        inp.value = '';
        Search.perform('');
        inp.focus();
      }
    });

    searchOverlay.addEventListener('click', function(e) {
      if (e.target === this) Search.close();
    });
  }
});
