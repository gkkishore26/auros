var Toast = {
  show: function(message, type) {
    type = type || 'success';
    var container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:10000;display:flex;flex-direction:column;gap:0.5rem;max-width:350px;';
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.style.cssText = 'padding:0.875rem 1.25rem;border-radius:0.5rem;background:rgb(var(--color-base-button));color:rgb(var(--color-base-button-text));font-size:0.875rem;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,0.15);transform:translateX(120%);opacity:0;transition:transform 0.3s ease,opacity 0.3s ease;';
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(function() {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });
    setTimeout(function() {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 3000);
  }
};
