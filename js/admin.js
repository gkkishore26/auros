var Admin = {
  STORAGE_KEY: 'ab_custom_products',
  currentFilter: 'all',
  searchTerm: '',
  currentImages: [],
  currentProductFile: null,

  previewVisible: false,

  init: function() {
    this.renderTabs();
    this.renderList();

    document.getElementById('btn-save').addEventListener('click', function(e) { e.preventDefault(); Admin.save(); });
    document.getElementById('btn-cancel').addEventListener('click', function(e) { e.preventDefault(); Admin.cancelEdit(); });
    document.getElementById('admin-search').addEventListener('input', function() { Admin.searchTerm = this.value.toLowerCase(); Admin.renderList(); });
    document.getElementById('btn-new-product').addEventListener('click', function() { Admin.newProduct(); });
    document.getElementById('btn-close-preview').addEventListener('click', function() { Admin.cancelEdit(); });

    var liveFields = ['field-name','field-slug','field-price','field-currency','field-compare','field-category','field-collection','field-desc','field-features','field-videos','field-colors'];
    liveFields.forEach(function(id) {
      document.getElementById(id).addEventListener('input', function() { if (Admin.previewVisible) Admin.updatePreview(); });
    });
    var badgeRadios = document.getElementsByName('badge');
    for (var i = 0; i < badgeRadios.length; i++) {
      badgeRadios[i].addEventListener('change', function() { if (Admin.previewVisible) Admin.updatePreview(); });
    }
    document.getElementById('field-name').addEventListener('input', function() {
      if (!document.getElementById('edit-id').value) {
        document.getElementById('field-slug').value = this.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
    });
    document.getElementById('field-images-file').addEventListener('change', function(e) { Admin.addImagesFromFile(e); });
    document.getElementById('btn-add-image-urls').addEventListener('click', function() { Admin.addImageUrls(); });
    document.getElementById('field-product-file').addEventListener('change', function(e) { Admin.handleProductFile(e); });
  },

  getCustom: function() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || []; } catch(e) { return []; }
  },

  saveCustom: function(products) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    window.__PRODUCTS__ = null;
    Store.init(function() {
      Admin.renderList();
      Admin.renderTabs();
    });
  },

  getAllProducts: function() {
    return window.__PRODUCTS__ || [];
  },

  getNextId: function() {
    var products = this.getAllProducts();
    var nums = products.map(function(p) { return typeof p.id === 'number' ? p.id : 0; });
    return nums.length > 0 ? Math.max.apply(null, nums) + 1 : 1;
  },

  renderTabs: function() {
    var container = document.getElementById('collection-tabs');
    var collections = {};
    this.getAllProducts().forEach(function(p) {
      var c = p.collection || 'uncategorized';
      if (!collections[c]) collections[c] = 0;
      collections[c]++;
    });
    var html = '<button class="' + (this.currentFilter === 'all' ? 'active' : '') + '" data-collection="all">All (' + this.getAllProducts().length + ')</button>';
    for (var key in collections) {
      html += '<button class="' + (this.currentFilter === key ? 'active' : '') + '" data-collection="' + key + '">' + key.charAt(0).toUpperCase() + key.slice(1) + ' (' + collections[key] + ')</button>';
    }
    container.innerHTML = html;
    var self = this;
    container.querySelectorAll('button').forEach(function(btn) {
      btn.addEventListener('click', function() {
        self.currentFilter = this.getAttribute('data-collection');
        self.renderTabs();
        self.renderList();
      });
    });
  },

  renderList: function() {
    var container = document.getElementById('product-list');
    var products = this.getAllProducts();
    var filtered = products.filter(function(p) {
      if (Admin.currentFilter !== 'all' && p.collection !== Admin.currentFilter) return false;
      if (Admin.searchTerm && p.name.toLowerCase().indexOf(Admin.searchTerm) === -1 && p.category.toLowerCase().indexOf(Admin.searchTerm) === -1) return false;
      return true;
    });
    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No products found.</p></div>';
      return;
    }
    var html = '';
    filtered.forEach(function(p) {
      var imgSrc = resolveImageSrc(p.images && p.images.length ? p.images[0] : (p.image ? p.image : 'placeholder.svg'));
      var badgeLabel = p.badge ? '<span style="font-size:0.75rem;color:rgb(var(--color-text-muted));margin-left:0.5rem;">[' + p.badge + ']</span>' : '';
      var sym = { 'USD': '$', 'INR': '₹', 'JPY': '¥', 'EUR': '€', 'GBP': '£' }[p.currency] || '₹';
      var priceHtml = p.comparePrice ? '<span style="text-decoration:line-through;color:rgb(var(--color-text-muted));margin-right:0.375rem;">' + sym + p.comparePrice.toLocaleString('en-IN') + '</span>' + sym + p.price.toLocaleString('en-IN') : sym + p.price.toLocaleString('en-IN');
      if (p.price === 0) priceHtml = 'Free';
      html += '<div class="product-item" data-id="' + p.id + '">' +
        '<img src="' + imgSrc + '" alt="" onerror="this.src=\'assets/images/placeholder.svg\'">' +
        '<div class="product-item-info">' +
          '<div class="name">' + p.name + badgeLabel + '</div>' +
          '<div class="meta">' + (p.category || '') + ' &middot; ' + priceHtml + '</div>' +
        '</div>' +
        '<div class="product-item-actions">' +
          '<button class="btn-sm btn-edit" data-id="' + p.id + '">Edit</button>' +
          '<button class="btn-sm btn-danger btn-delete" data-id="' + p.id + '">Delete</button>' +
        '</div>' +
      '</div>';
    });
    container.innerHTML = html;
    var self = this;
    container.querySelectorAll('.btn-edit').forEach(function(btn) {
      btn.addEventListener('click', function() { Admin.edit(this.getAttribute('data-id')); });
    });
    container.querySelectorAll('.btn-delete').forEach(function(btn) {
      btn.addEventListener('click', function() { Admin.remove(this.getAttribute('data-id')); });
    });
  },

  populateForm: function(product) {
    document.getElementById('form-title').textContent = 'Edit Product';
    document.getElementById('edit-id').value = product.id;
    document.getElementById('field-name').value = product.name || '';
    document.getElementById('field-slug').value = product.slug || '';
    document.getElementById('field-price').value = product.price || 0;
    document.getElementById('field-currency').value = product.currency || 'INR';
    document.getElementById('field-compare').value = product.comparePrice || '';
    document.getElementById('field-id').value = product.id;
    document.getElementById('field-category').value = product.category || '';
    document.getElementById('field-collection').value = product.collection || 'presets';
    document.getElementById('field-desc').value = product.description || '';
    document.getElementById('field-features').value = (product.features || []).join('\n');
    this.currentImages = (product.images || []).slice();
    this.renderImagePreviews();
    this.currentProductFile = product.productFile || null;
    this.renderProductFilePreview();
    document.getElementById('field-videos').value = (product.videos || []).join('\n');
    document.getElementById('field-colors').value = (product.colors || []).join('\n');
    var radios = document.getElementsByName('badge');
    for (var i = 0; i < radios.length; i++) {
      radios[i].checked = radios[i].value === (product.badge || '');
    }
    document.getElementById('btn-cancel').style.display = 'inline-block';
    document.getElementById('btn-save').textContent = 'Update Product';
    this.showPreview();
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  clearForm: function() {
    document.getElementById('form-title').textContent = 'Add Product';
    document.getElementById('edit-id').value = '';
    document.getElementById('field-name').value = '';
    document.getElementById('field-slug').value = '';
    document.getElementById('field-price').value = '';
    document.getElementById('field-currency').value = 'INR';
    document.getElementById('field-compare').value = '';
    document.getElementById('field-id').value = '';
    document.getElementById('field-category').value = '';
    document.getElementById('field-collection').value = 'presets';
    document.getElementById('field-desc').value = '';
    document.getElementById('field-features').value = '';
    this.currentImages = [];
    this.renderImagePreviews();
    document.getElementById('field-image-urls').value = '';
    this.currentProductFile = null;
    document.getElementById('field-product-file').value = '';
    this.renderProductFilePreview();
    document.getElementById('field-videos').value = '';
    document.getElementById('field-colors').value = '';
    var radios = document.getElementsByName('badge');
    for (var i = 0; i < radios.length; i++) { radios[i].checked = radios[i].value === ''; }
    document.getElementById('btn-cancel').style.display = 'none';
    document.getElementById('btn-save').textContent = 'Save Product';
    if (this.previewVisible) this.updatePreview();
  },

  newProduct: function() {
    this.clearForm();
    this.showPreview();
  },

  showPreview: function() {
    this.previewVisible = true;
    document.getElementById('product-list').style.display = 'none';
    document.getElementById('collection-tabs').style.display = 'none';
    document.getElementById('search-bar-wrap').style.display = 'none';
    document.getElementById('livePreview').style.display = 'block';
    this.updatePreview();
  },

  hidePreview: function() {
    this.previewVisible = false;
    document.getElementById('product-list').style.display = '';
    document.getElementById('collection-tabs').style.display = '';
    document.getElementById('search-bar-wrap').style.display = '';
    document.getElementById('livePreview').style.display = 'none';
  },

  updatePreview: function() {
    var data = this.getFormData();
    // Badge
    var badgeEl = document.getElementById('preview-badge');
    badgeEl.innerHTML = data.badge ? '<span>' + data.badge + '</span>' : '';
    // Name
    document.getElementById('preview-name').textContent = data.name || 'Product Name';
    // Price
    var price = data.price || 0;
    var sym = { 'USD': '$', 'INR': '₹', 'JPY': '¥', 'EUR': '€', 'GBP': '£' }[data.currency] || '₹';
    var priceStr = price === 0 ? 'Free' : sym + price.toLocaleString('en-IN');
    document.getElementById('preview-price').textContent = priceStr;
    var compareEl = document.getElementById('preview-compare');
    if (data.comparePrice) {
      compareEl.textContent = sym + data.comparePrice.toLocaleString('en-IN');
      compareEl.style.display = '';
    } else {
      compareEl.style.display = 'none';
    }
    // Meta
    var metaParts = [];
    if (data.category) metaParts.push(data.category);
    if (data.collection) metaParts.push(data.collection.charAt(0).toUpperCase() + data.collection.slice(1));
    document.getElementById('preview-meta').textContent = metaParts.length ? metaParts.join(' · ') : 'Category · Collection';
    // Description
    document.getElementById('preview-desc').textContent = data.description || 'Product description will appear here...';
    // Features
    var featuresEl = document.getElementById('preview-features');
    if (data.features && data.features.length) {
      featuresEl.innerHTML = data.features.map(function(f) { return '<li>' + f + '</li>'; }).join('');
    } else {
      featuresEl.innerHTML = '<li class="preview-feature-empty">No features listed</li>';
    }
    // Images
    var mainImg = document.getElementById('preview-main-img');
    var thumbsEl = document.getElementById('preview-thumbs');
    var images = this.currentImages;
    if (images && images.length) {
      var firstSrc = resolveImageSrc ? resolveImageSrc(images[0]) : images[0];
      mainImg.innerHTML = '<img src="' + firstSrc + '" alt="" onerror="this.parentElement.innerHTML=\'<div class=\\\'preview-img-placeholder\\\'>Image error</div>\'">';
      var thumbsHtml = '';
      images.forEach(function(img, idx) {
        var src = resolveImageSrc ? resolveImageSrc(img) : img;
        thumbsHtml += '<div class="thumb' + (idx === 0 ? ' active' : '') + '"><img src="' + src + '" alt="" onerror="this.style.display=\'none\'"></div>';
      });
      thumbsEl.innerHTML = thumbsHtml;
    } else {
      mainImg.innerHTML = '<div class="preview-img-placeholder">No image</div>';
      thumbsEl.innerHTML = '';
    }
  },

  getFormData: function() {
    var images = this.currentImages;
    var videos = document.getElementById('field-videos').value.split('\n').map(function(s) { return s.trim(); }).filter(function(s) { return s; });
    var colors = document.getElementById('field-colors').value.split('\n').map(function(s) { return s.trim(); }).filter(function(s) { return s; });
    var features = document.getElementById('field-features').value.split('\n').map(function(s) { return s.trim(); }).filter(function(s) { return s; });
    var badge = '';
    var radios = document.getElementsByName('badge');
    for (var i = 0; i < radios.length; i++) { if (radios[i].checked) { badge = radios[i].value; break; } }
    var price = parseInt(document.getElementById('field-price').value) || 0;
    var comparePrice = document.getElementById('field-compare').value ? parseInt(document.getElementById('field-compare').value) : null;
    return {
      id: document.getElementById('edit-id').value || this.getNextId(),
      name: document.getElementById('field-name').value.trim(),
      slug: document.getElementById('field-slug').value.trim(),
      price: price,
      currency: document.getElementById('field-currency').value,
      comparePrice: comparePrice,
      category: document.getElementById('field-category').value.trim(),
      collection: document.getElementById('field-collection').value,
      description: document.getElementById('field-desc').value.trim(),
      features: features,
      images: images,
      image: images.length > 0 ? images[0] : null,
      videos: videos,
      colors: colors,
      badge: badge || null,
      productFile: this.currentProductFile
    };
  },

  addImageUrls: function() {
    var textarea = document.getElementById('field-image-urls');
    var urls = textarea.value.split('\n').map(function(s) { return s.trim(); }).filter(function(s) { return s; });
    if (!urls.length) return;
    urls.forEach(function(url) {
      if (Admin.currentImages.indexOf(url) === -1) Admin.currentImages.push(url);
    });
    Admin.renderImagePreviews();
    textarea.value = '';
  },

  addImagesFromFile: function(event) {
    var files = event.target.files;
    if (!files.length) return;
    var loaded = 0;
    for (var i = 0; i < files.length; i++) {
      (function(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          Admin.currentImages.push(e.target.result);
          loaded++;
          if (loaded === files.length) {
            Admin.renderImagePreviews();
            document.getElementById('field-images-file').value = '';
          }
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  },

  renderImagePreviews: function() {
    var container = document.getElementById('image-previews');
    if (!this.currentImages.length) {
      container.innerHTML = '<span class="image-preview-empty">No images uploaded yet</span>';
    } else {
      var html = '';
      this.currentImages.forEach(function(img, idx) {
        html += '<div class="image-preview-item">' +
          '<img src="' + (img.indexOf('://') > -1 || img.indexOf('data:') === 0 ? img : 'assets/images/' + img) + '" alt="">' +
          '<button type="button" class="image-preview-remove" data-index="' + idx + '">&times;</button>' +
        '</div>';
      });
      container.innerHTML = html;
      var self = this;
      container.querySelectorAll('.image-preview-remove').forEach(function(btn) {
        btn.addEventListener('click', function() { self.removeImage(parseInt(this.getAttribute('data-index'))); });
      });
    }
    if (this.previewVisible) this.updatePreview();
  },

  removeImage: function(index) {
    this.currentImages.splice(index, 1);
    this.renderImagePreviews();
  },

  handleProductFile: function(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    var self = this;
    reader.onload = function(e) {
      self.currentProductFile = {
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        data: e.target.result
      };
      self.renderProductFilePreview();
    };
    reader.readAsDataURL(file);
  },

  renderProductFilePreview: function() {
    var container = document.getElementById('product-file-preview');
    if (!this.currentProductFile) {
      container.innerHTML = '<span class="file-preview-empty">No file uploaded</span>';
      return;
    }
    var size = this.currentProductFile.size;
    var sizeStr = '';
    if (size < 1024) sizeStr = size + ' B';
    else if (size < 1048576) sizeStr = (size / 1024).toFixed(1) + ' KB';
    else sizeStr = (size / 1048576).toFixed(1) + ' MB';
    container.innerHTML =
      '<div class="file-preview">' +
        '<div class="file-preview-icon">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' +
        '</div>' +
        '<div class="file-preview-info">' +
          '<div class="file-preview-name">' + this.currentProductFile.name + '</div>' +
          '<div class="file-preview-size">' + sizeStr + '</div>' +
        '</div>' +
        '<button type="button" class="file-preview-remove" id="btn-remove-product-file">&times;</button>' +
      '</div>';
    document.getElementById('btn-remove-product-file').addEventListener('click', function() {
      Admin.removeProductFile();
    });
  },

  removeProductFile: function() {
    this.currentProductFile = null;
    document.getElementById('field-product-file').value = '';
    this.renderProductFilePreview();
  },

  save: function() {
    var data = this.getFormData();
    if (!data.name) { this.toast('Product name is required', 'error'); return; }
    if (!data.slug) { this.toast('Slug is required', 'error'); return; }
    var custom = this.getCustom();
    var editId = document.getElementById('edit-id').value;
    if (editId) {
      var idx = custom.findIndex(function(p) { return String(p.id) === editId; });
      if (idx > -1) custom[idx] = data;
      else custom.push(data);
    } else {
      custom.push(data);
    }
    this.saveCustom(custom);
    this.clearForm();
    this.hidePreview();
    this.toast('Product saved!', 'success');
  },

  edit: function(id) {
    var all = this.getAllProducts();
    var product = all.find(function(p) { return String(p.id) === String(id); });
    if (product) this.populateForm(product);
  },

  remove: function(id) {
    if (!confirm('Delete this product?')) return;
    var sid = String(id);
    var custom = this.getCustom();
    custom = custom.filter(function(p) { return String(p.id) !== sid; });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(custom));
    var deleted = JSON.parse(localStorage.getItem('ab_deleted_products')) || [];
    if (deleted.indexOf(id) === -1) deleted.push(id);
    localStorage.setItem('ab_deleted_products', JSON.stringify(deleted));
    window.__PRODUCTS__ = null;
    Store.init(function() {
      Admin.renderList();
      Admin.renderTabs();
    });
    this.toast('Product deleted', 'success');
    if (String(document.getElementById('edit-id').value) === sid) this.cancelEdit();
  },

  cancelEdit: function() {
    this.clearForm();
    this.hidePreview();
  },

  toast: function(msg, type) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'toast ' + type + ' show';
    setTimeout(function() { el.classList.remove('show'); }, 2500);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  Store.init(function() { Admin.init(); });
});