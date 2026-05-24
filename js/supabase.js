var SUPABASE_URL = 'https://imqbkkjwkcyoqyhsvnle.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcWJra2p3a2N5b3F5aHN2bmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTE4NTUsImV4cCI6MjA5NTE4Nzg1NX0.iEgB4FMCQfBry69Ss7TVSsj_LdW85pQuZChJYg6_mkM';

var SupabaseClient = {
  _client: null,

  init: function() {
    if (this._client) return this._client;
    if (typeof supabase === 'undefined') {
      console.error('Supabase JS library not loaded');
      return null;
    }
    this._client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return this._client;
  },

  getClient: function() {
    if (!this._client) this.init();
    return this._client;
  },

  /* ── Auth ── */
  auth: {
    signUp: async function(email, password, options) {
      var client = SupabaseClient.getClient();
      return client.auth.signUp({ email: email, password: password, options: options });
    },
    signIn: async function(email, password) {
      var client = SupabaseClient.getClient();
      return client.auth.signInWithPassword({ email: email, password: password });
    },
    signOut: async function() {
      var client = SupabaseClient.getClient();
      return client.auth.signOut();
    },
    getUser: function() {
      var client = SupabaseClient.getClient();
      return client.auth.getUser();
    },
    getSession: function() {
      var client = SupabaseClient.getClient();
      return client.auth.getSession();
    },
    onAuthStateChange: function(callback) {
      var client = SupabaseClient.getClient();
      return client.auth.onAuthStateChange(callback);
    }
  },

  /* ── Database ── */
  db: {
    products: function() { return SupabaseClient.getClient().from('products'); },
    users: function() { return SupabaseClient.getClient().from('users'); },
    orders: function() { return SupabaseClient.getClient().from('orders'); },
    orderItems: function() { return SupabaseClient.getClient().from('order_items'); },
    reviews: function() { return SupabaseClient.getClient().from('reviews'); },
    wishlist: function() { return SupabaseClient.getClient().from('wishlist_items'); }
  }
};
