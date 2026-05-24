var Account = {
  USERS_KEY: 'auros_users',
  SESSION_KEY: 'auros_session',
  ORDERS_KEY: 'auros_orders',

  init: function() {
    this.updateUI();
  },

  getUsers: function() {
    try { return JSON.parse(localStorage.getItem(this.USERS_KEY)) || []; } catch { return []; }
  },

  saveUsers: function(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  getSession: function() {
    try { return JSON.parse(localStorage.getItem(this.SESSION_KEY)); } catch { return null; }
  },

  saveSession: function(session) {
    if (session) localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(this.SESSION_KEY);
  },

  isLoggedIn: function() {
    return !!this.getSession();
  },

  getCurrentUser: function() {
    var session = this.getSession();
    if (!session) return null;
    var users = this.getUsers();
    return users.find(function(u) { return u.email === session.email; }) || null;
  },

  signup: function(name, email, password) {
    var users = this.getUsers();
    if (users.find(function(u) { return u.email === email; })) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    users.push({ name: name, email: email, password: password, created: new Date().toISOString() });
    this.saveUsers(users);
    this.saveSession({ email: email, name: name });
    this.updateUI();
    return { success: true };
  },

  login: function(email, password) {
    var users = this.getUsers();
    var user = users.find(function(u) { return u.email === email && u.password === password; });
    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }
    this.saveSession({ email: email, name: user.name });
    this.updateUI();
    return { success: true };
  },

  logout: function() {
    this.saveSession(null);
    this.updateUI();
  },

  getOrders: function() {
    var session = this.getSession();
    if (!session) return [];
    try {
      var all = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
      return all.filter(function(o) { return o.email === session.email; });
    } catch { return []; }
  },

  placeOrder: function(items, total, address) {
    var session = this.getSession();
    if (!session) return null;
    var order = {
      id: 'AUROS-' + Date.now().toString(36).toUpperCase(),
      email: session.email,
      items: items,
      total: total,
      address: address,
      status: 'Confirmed',
      date: new Date().toISOString()
    };
    var all = [];
    try { all = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || []; } catch {}
    all.push(order);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(all));
    localStorage.removeItem('ab_cart');
    if (typeof Cart !== 'undefined') Cart.updateUI();
    return order;
  },

  updateUI: function() {
    var user = this.getCurrentUser();
    document.querySelectorAll('.account-link').forEach(function(el) {
      if (user) {
        el.textContent = user.name;
        el.href = 'account.html';
      } else {
        el.textContent = 'Log in';
        el.href = '#';
        el.onclick = function(e) { e.preventDefault(); Account.showAuthModal(); };
      }
    });
    document.querySelectorAll('.account-link-desktop').forEach(function(el) {
      if (user) {
        el.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>' + user.name.split(' ')[0] + '</span>';
        el.href = 'account.html';
      } else {
        el.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
        el.href = '#';
        el.onclick = function(e) { e.preventDefault(); Account.showAuthModal(); };
      }
    });
  },

  showAuthModal: function() {
    var existing = document.getElementById('auth-modal');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'auth-modal-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = '<div id="auth-modal" style="background:rgb(var(--color-base-background));border-radius:0.75rem;padding:2.5rem;width:100%;max-width:400px;margin:1rem;box-shadow:0 20px 60px rgba(0,0,0,0.2);">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">' +
        '<h2 style="font-size:1.5rem;font-weight:700;margin:0;" id="auth-title">Log in</h2>' +
        '<button onclick="document.getElementById(\'auth-modal-overlay\').remove()" style="background:none;border:none;cursor:pointer;color:rgb(var(--color-text-muted));font-size:1.5rem;">&times;</button>' +
      '</div>' +
      '<div id="auth-error" style="color:#dc2626;font-size:0.875rem;margin-bottom:0.75rem;display:none;"></div>' +
      '<div id="auth-form">' +
        '<div id="auth-name-field" style="margin-bottom:1rem;display:none;">' +
          '<label style="font-size:0.875rem;font-weight:500;margin-bottom:0.5rem;display:block;">Full name</label>' +
          '<input type="text" id="auth-name" style="width:100%;padding:0.75rem;border:1px solid rgb(var(--color-border));border-radius:0.375rem;background:transparent;color:rgb(var(--color-base-text));font-size:0.9375rem;box-sizing:border-box;">' +
        '</div>' +
        '<div style="margin-bottom:1rem;">' +
          '<label style="font-size:0.875rem;font-weight:500;margin-bottom:0.5rem;display:block;">Email</label>' +
          '<input type="email" id="auth-email" style="width:100%;padding:0.75rem;border:1px solid rgb(var(--color-border));border-radius:0.375rem;background:transparent;color:rgb(var(--color-base-text));font-size:0.9375rem;box-sizing:border-box;">' +
        '</div>' +
        '<div style="margin-bottom:1.5rem;">' +
          '<label style="font-size:0.875rem;font-weight:500;margin-bottom:0.5rem;display:block;">Password</label>' +
          '<input type="password" id="auth-password" style="width:100%;padding:0.75rem;border:1px solid rgb(var(--color-border));border-radius:0.375rem;background:transparent;color:rgb(var(--color-base-text));font-size:0.9375rem;box-sizing:border-box;">' +
        '</div>' +
        '<button id="auth-submit" class="btn btn-primary" style="width:100%;margin-bottom:0.75rem;">Log in</button>' +
        '<p style="text-align:center;font-size:0.875rem;color:rgb(var(--color-text-muted));margin:0;">' +
          '<span id="auth-toggle-text">Don\'t have an account?</span> ' +
          '<a href="#" id="auth-toggle" style="color:rgb(var(--color-base-text));font-weight:600;">Sign up</a>' +
        '</p>' +
      '</div>' +
    '</div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

    var isSignup = false;
    var title = document.getElementById('auth-title');
    var submit = document.getElementById('auth-submit');
    var toggle = document.getElementById('auth-toggle');
    var toggleText = document.getElementById('auth-toggle-text');
    var nameField = document.getElementById('auth-name-field');
    var errorEl = document.getElementById('auth-error');

    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      isSignup = !isSignup;
      title.textContent = isSignup ? 'Create account' : 'Log in';
      submit.textContent = isSignup ? 'Create account' : 'Log in';
      toggleText.textContent = isSignup ? 'Already have an account?' : 'Don\'t have an account?';
      toggle.textContent = isSignup ? 'Log in' : 'Sign up';
      nameField.style.display = isSignup ? 'block' : 'none';
      errorEl.style.display = 'none';
    });

    submit.addEventListener('click', function() {
      var email = document.getElementById('auth-email').value.trim();
      var password = document.getElementById('auth-password').value;
      errorEl.style.display = 'none';
      if (isSignup) {
        var name = document.getElementById('auth-name').value.trim();
        if (!name || !email || !password) {
          errorEl.textContent = 'Please fill in all fields.';
          errorEl.style.display = 'block'; return;
        }
        if (password.length < 6) {
          errorEl.textContent = 'Password must be at least 6 characters.';
          errorEl.style.display = 'block'; return;
        }
        var result = Account.signup(name, email, password);
        if (result.success) { overlay.remove(); }
        else { errorEl.textContent = result.error; errorEl.style.display = 'block'; }
      } else {
        if (!email || !password) {
          errorEl.textContent = 'Please fill in all fields.';
          errorEl.style.display = 'block'; return;
        }
        var result = Account.login(email, password);
        if (result.success) { overlay.remove(); }
        else { errorEl.textContent = result.error; errorEl.style.display = 'block'; }
      }
    });
  }
};
