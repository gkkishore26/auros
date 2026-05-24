var Auth = {
  currentUser: null,
  pendingAction: null,
  _initialized: false,

  init: function() {
    if (this._initialized) return;
    this._initialized = true;
    this._initSupabase();
    this.updateUI();
    this.setupListeners();
    this.renderMenu();
  },

  _initSupabase: function() {
    var self = this;
    if (typeof SupabaseClient === 'undefined') {
      this.restoreSession();
      return;
    }
    SupabaseClient.auth.getSession().then(function(result) {
      if (result.data && result.data.session) {
        SupabaseClient.db.users().select('*').eq('id', result.data.session.user.id).single().then(function(u) {
          if (u.data) {
            self.currentUser = { id: u.data.id, name: u.data.display_name || u.data.email, email: u.data.email };
            self.updateUI();
          }
        });
      } else {
        self.restoreSession();
      }
    }).catch(function() { self.restoreSession(); });

    SupabaseClient.auth.onAuthStateChange(function(event, session) {
      if (event === 'SIGNED_IN' && session) {
        SupabaseClient.db.users().select('*').eq('id', session.user.id).single().then(function(u) {
          if (u.data) {
            self.currentUser = { id: u.data.id, name: u.data.display_name || u.data.email, email: u.data.email };
            self.updateUI();
          }
        });
      } else if (event === 'SIGNED_OUT') {
        self.currentUser = null;
        self.updateUI();
      }
    });
  },

  /* ── Session ─────────────────────────────────── */

  restoreSession: function() {
    try {
      var data = JSON.parse(localStorage.getItem('ab_session'));
      if (data && data.email) {
        var users = this._getUsers();
        var found = users.find(function(u) { return u.email === data.email; });
        if (found) {
          this.currentUser = found;
        } else {
          localStorage.removeItem('ab_session');
        }
      }
    } catch(e) {
      localStorage.removeItem('ab_session');
    }
  },

  saveSession: function() {
    if (this.currentUser) {
      localStorage.setItem('ab_session', JSON.stringify({ email: this.currentUser.email }));
    }
  },

  clearSession: function() {
    localStorage.removeItem('ab_session');
    this.currentUser = null;
  },

  _getUsers: function() {
    try { return JSON.parse(localStorage.getItem('ab_users')) || []; } catch(e) { return []; }
  },

  _saveUsers: function(users) {
    localStorage.setItem('ab_users', JSON.stringify(users));
  },

  /* ── Auth actions ─────────────────────────────── */

  isLoggedIn: function() {
    return this.currentUser !== null;
  },

  signup: function(name, email, password) {
    var self = this;
    if (typeof SupabaseClient !== 'undefined' && SupabaseClient.getClient()) {
      SupabaseClient.auth.signUp(email, password, { data: { full_name: name } }).then(function(result) {
        if (result.error) {
          if (document.getElementById('auth-error')) {
            document.getElementById('auth-error').textContent = result.error.message;
            document.getElementById('auth-error').style.display = 'block';
          }
          return { ok: false, error: result.error.message };
        }
        self.currentUser = { id: result.data.user.id, name: name, email: email };
        self.saveSession();
        self.updateUI();
        self.runPending();
        return { ok: true };
      });
      return { ok: true, pending: true };
    }
    var users = this._getUsers();
    if (users.find(function(u) { return u.email === email; })) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    var user = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      created: new Date().toISOString()
    };
    users.push(user);
    this._saveUsers(users);
    this.currentUser = user;
    this.saveSession();
    this.updateUI();
    this.runPending();
    return { ok: true };
  },

  login: function(email, password) {
    var self = this;
    if (typeof SupabaseClient !== 'undefined' && SupabaseClient.getClient()) {
      SupabaseClient.auth.signIn(email, password).then(function(result) {
        if (result.error) {
          if (document.getElementById('auth-error')) {
            document.getElementById('auth-error').textContent = result.error.message;
            document.getElementById('auth-error').style.display = 'block';
          }
          return { ok: false, error: result.error.message };
        }
        SupabaseClient.db.users().select('*').eq('id', result.data.user.id).single().then(function(u) {
          if (u.data) {
            self.currentUser = { id: u.data.id, name: u.data.display_name || u.data.email, email: u.data.email };
          } else {
            self.currentUser = { id: result.data.user.id, name: email, email: email };
          }
          self.saveSession();
          self.updateUI();
          self.runPending();
        });
      });
      return { ok: true, pending: true };
    }
    var users = this._getUsers();
    var found = users.find(function(u) { return u.email === email; });
    if (!found) {
      return { ok: false, error: 'No account found with this email.' };
    }
    if (found.password !== password) {
      return { ok: false, error: 'Incorrect password. Please try again.' };
    }
    this.currentUser = found;
    this.saveSession();
    this.updateUI();
    this.runPending();
    return { ok: true };
  },

  logout: function() {
    var self = this;
    if (typeof SupabaseClient !== 'undefined' && SupabaseClient.getClient()) {
      SupabaseClient.auth.signOut().then(function() {
        self.currentUser = null;
        self.updateUI();
      });
    } else {
      this.clearSession();
    }
    this.updateUI();
    var overlay = document.getElementById('authOverlay');
    if (overlay) overlay.classList.remove('active');
    var menu = document.getElementById('authAccountMenu');
    if (menu) menu.classList.remove('active');
    if (typeof Toast !== 'undefined') Toast.show('Logged out successfully');
  },

  getCurrentUser: function() {
    return this.currentUser;
  },

  /* ── Protected actions ──────────────────────────── */

  require: function(callback) {
    if (this.isLoggedIn()) {
      if (callback) callback();
      return true;
    }
    sessionStorage.setItem('ab_auth_return', window.location.href);
    window.location.href = 'login.html';
    return false;
  },

  runPending: function() {
    if (this.pendingAction) {
      var fn = this.pendingAction;
      this.pendingAction = null;
      setTimeout(fn, 100);
    }
  },

  /* ── Account menu ───────────────────────────────── */

  toggleMenu: function() {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('ab_auth_return', window.location.href);
      window.location.href = 'login.html';
      return;
    }
    var menu = document.getElementById('authAccountMenu');
    if (!menu) return;
    menu.classList.toggle('active');
    var nameEl = document.getElementById('authMenuName');
    var emailEl = document.getElementById('authMenuEmail');
    if (nameEl) nameEl.textContent = this.currentUser.name;
    if (emailEl) emailEl.textContent = this.currentUser.email;
  },

  closeMenu: function() {
    var menu = document.getElementById('authAccountMenu');
    if (menu) menu.classList.remove('active');
  },

  /* ── UI update ──────────────────────────────────── */

  updateUI: function() {
    var icon = document.querySelector('.account-link-desktop');
    if (icon) {
      if (this.isLoggedIn()) {
        icon.classList.add('logged-in');
        icon.setAttribute('data-initials', this._getInitials(this.currentUser.name));
      } else {
        icon.classList.remove('logged-in');
        icon.removeAttribute('data-initials');
      }
    }
    var mobileLink = document.querySelector('.account-link');
    if (mobileLink) {
      mobileLink.textContent = this.isLoggedIn() ? this.currentUser.name : 'Log in';
      mobileLink.href = this.isLoggedIn() ? 'account.html' : 'login.html';
    }
  },

  _getInitials: function(name) {
    return name.split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
  },

  /* ── Render Modal + Menu HTML ────────────────────── */

  renderMenu: function() {
    if (document.getElementById('authAccountMenu')) return;
    var div = document.createElement('div');
    div.innerHTML = `<!-- Account Menu -->
    <div class="auth-account-menu" id="authAccountMenu">
      <div class="auth-menu-header">
        <span class="auth-menu-name" id="authMenuName"></span>
        <span class="auth-menu-email" id="authMenuEmail"></span>
      </div>
      <div class="auth-menu-body">
        <a href="account.html" class="auth-menu-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          My Profile
        </a>
        <a href="account.html#orders" class="auth-menu-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          My Orders
        </a>
        <a href="account.html#wishlist" class="auth-menu-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
          Wishlist
        </a>
        <a href="account.html#addresses" class="auth-menu-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Saved Addresses
        </a>
        <a href="#" class="auth-menu-item" onclick="document.querySelector(\'[data-cart-toggle]\')?.click();Auth.closeMenu();return false;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Cart
        </a>
        <button class="auth-menu-item auth-menu-logout" id="authLogoutBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>
    </div>
    `;
    document.body.appendChild(div.firstElementChild);
    document.body.appendChild(div.children[1]);

    // Also add the auth menu after the header
    var header = document.getElementById('app-header');
    if (header) {
      var menuClone = document.getElementById('authAccountMenu');
      header.appendChild(menuClone);
    }

    if (!document.getElementById('authStyles')) this._injectStyles();
  },

  _injectStyles: function() {
    var css = document.createElement('style');
    css.id = 'authStyles';
    css.textContent = `
      /* Account Menu */
      .auth-account-menu{position:absolute;top:calc(100% + 0.5rem);right:0;width:240px;background:rgb(var(--color-base-background));border:1px solid rgb(var(--color-border)/0.5);border-radius:0.75rem;box-shadow:0 10px 40px rgba(0,0,0,0.1);opacity:0;visibility:hidden;transform:translateY(-5px);transition:all 0.2s;z-index:100;overflow:hidden;}
      .auth-account-menu.active{opacity:1;visibility:visible;transform:translateY(0);}
      .auth-menu-header{padding:1rem 1.25rem;border-bottom:1px solid rgb(var(--color-border)/0.3);}
      .auth-menu-name{display:block;font-size:0.9375rem;font-weight:600;}
      .auth-menu-email{display:block;font-size:0.8125rem;color:rgb(var(--color-text-muted));margin-top:0.125rem;}
      .auth-menu-body{display:flex;flex-direction:column;padding:0.5rem;}
      .auth-menu-item{display:flex;align-items:center;gap:0.75rem;padding:0.625rem 0.75rem;font-size:0.875rem;color:rgb(var(--color-base-text));border-radius:0.375rem;transition:background 0.2s;text-decoration:none;border:none;background:none;cursor:pointer;font-family:inherit;width:100%;text-align:left;}
      .auth-menu-item:hover{background:rgb(var(--color-border)/0.2);}
      .auth-menu-logout{margin-top:0.25rem;border-top:1px solid rgb(var(--color-border)/0.3);padding-top:0.75rem;border-radius:0;color:#dc2626;}
      .auth-menu-logout:hover{color:#dc2626;background:#fef2f2;}
      [data-theme="dark"] .auth-menu-logout:hover{background:rgba(220,38,38,0.1);}

      /* Header user icon logged-in state */
      .account-link-desktop.logged-in{position:relative;}
      .account-link-desktop.logged-in svg{display:none;}
      .account-link-desktop.logged-in::after{content:attr(data-initials);display:flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;border-radius:50%;background:rgb(var(--color-base-button));color:rgb(var(--color-base-button-text));font-size:0.75rem;font-weight:700;letter-spacing:0.02em;}

      /* Mobile auth link */
      .account-link{display:flex!important;}

      @media(max-width:480px){.auth-modal{padding:1.5rem;}}
    `;
    document.head.appendChild(css);
  },

  /* ── Event listeners ─────────────────────────────── */

  setupListeners: function() {
    var self = this;

    document.addEventListener('click', function(e) {
      // Account icon
      if (e.target.closest('.account-link-desktop')) {
        e.preventDefault();
        self.toggleMenu();
        return;
      }

      // Close menu on outside click
      var menu = document.getElementById('authAccountMenu');
      if (menu && menu.classList.contains('active') && !e.target.closest('.account-link-desktop') && !e.target.closest('#authAccountMenu')) {
        self.closeMenu();
      }

      // Logout
      if (e.target.closest('#authLogoutBtn')) {
        e.preventDefault();
        self.logout();
        self.closeMenu();
      }

      // Mobile account link
      if (e.target.closest('.account-link')) {
        if (!self.isLoggedIn()) {
          e.preventDefault();
          sessionStorage.setItem('ab_auth_return', window.location.href);
          window.location.href = 'login.html';
        }
      }

      // Password visibility toggle
      var pwToggle = e.target.closest('.auth-pw-toggle');
      if (pwToggle) {
        var inputId = pwToggle.getAttribute('data-for');
        var input = document.getElementById(inputId);
        if (input) {
          var isPw = input.getAttribute('type') === 'password';
          input.setAttribute('type', isPw ? 'text' : 'password');
          pwToggle.querySelector('.auth-eye').style.display = isPw ? 'none' : '';
          pwToggle.querySelector('.auth-eye-off').style.display = isPw ? '' : 'none';
        }
      }
    });

    // Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        self.closeMenu();
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  Auth.init();
});
