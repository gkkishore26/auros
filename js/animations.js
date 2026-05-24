document.addEventListener('DOMContentLoaded', function() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, [data-animate]');

  if (revealElements.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => {
            if (entry.target.dataset.animate) {
              entry.target.classList.add(entry.target.dataset.animate);
            } else {
              entry.target.classList.add('revealed');
            }
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => {
      if (el.dataset.animate) {
        el.classList.add(el.dataset.animate);
      } else {
        el.classList.add('revealed');
      }
    });
  }
});
