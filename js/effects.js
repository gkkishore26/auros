var Effects = {
  init: function() {
    this.typewriter();
    this.cardTilt();
    this.scrollParallax();
    this.particles();
    this.smoothAnchors();
  },

  typewriter: function() {
    var el = document.getElementById('tagline-text');
    if (!el) return;
    var phrases = [
      'Professional presets, motion graphics & project files',
      'High-quality digital assets for every creative need',
      'Best-in-class E-products at unbeatable value'
    ];
    var phraseIdx = 0;
    var charIdx = 0;
    var isDeleting = false;
    var cursor = document.querySelector('.tagline-cursor');

    function type() {
      var current = phrases[phraseIdx];
      if (!isDeleting) {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          setTimeout(function() { isDeleting = true; type(); }, 2000);
          return;
        }
        setTimeout(type, 50 + Math.random() * 60);
      } else {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(type, 500);
          return;
        }
        setTimeout(type, 25 + Math.random() * 30);
      }
    }
    setTimeout(type, 500);
  },

  cardTilt: function() {
    var cards = document.querySelectorAll('.product-card, .project-card');
    cards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / centerY * -8;
        var rotateY = (x - centerX) / centerX * 8;
        this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
        this.style.boxShadow = (-rotateY * 0.5 + 4) + 'px ' + (rotateX * 0.5 + 4) + 'px 30px rgba(0,0,0,0.1)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  },

  scrollParallax: function() {
    var hero = document.querySelector('.hero-section');
    var heroContent = document.querySelector('.hero-content');
    if (!hero || !heroContent) return;
    window.addEventListener('scroll', function() {
      var scroll = window.pageYOffset;
      if (scroll < window.innerHeight) {
        heroContent.style.transform = 'translateY(' + (scroll * 0.15) + 'px)';
        heroContent.style.opacity = 1 - (scroll / window.innerHeight) * 0.5;
      }
    }, { passive: true });
  },

  particles: function() {
    var container = document.querySelector('.particle-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'particle-container';
      document.body.prepend(container);
    }
    var isMobile = window.innerWidth < 768;
    var count = isMobile ? 12 : 25;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      var size = 2 + Math.random() * 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = 15 + Math.random() * 25 + 's';
      p.style.animationDelay = Math.random() * 20 + 's';
      container.appendChild(p);
    }
  },

  smoothAnchors: function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var id = this.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  Effects.init();
});
