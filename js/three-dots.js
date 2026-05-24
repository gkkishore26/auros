var DottedSurface = (function() {
  var container = null;
  var scene = null;
  var camera = null;
  var renderer = null;
  var geometry = null;
  var material = null;
  var points = null;
  var animationId = null;
  var count = 0;
  var SEPARATION = 150;
  var AMOUNTX = 40;
  var AMOUNTY = 60;
  var isActive = false;

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function init() {
    container = document.getElementById('dots-container');
    if (!container) return;

    var w = window.innerWidth;
    var h = window.innerHeight;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.00015);

    camera = new THREE.PerspectiveCamera(60, w / h, 1, 10000);
    camera.position.set(0, 355, 1220);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    var positions = new Float32Array(AMOUNTX * AMOUNTY * 3);
    var colors = new Float32Array(AMOUNTX * AMOUNTY * 3);

    var idx = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        var x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        var y = 0;
        var z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        if (getTheme() === 'dark') {
          colors[idx] = 0.8;
          colors[idx + 1] = 0.8;
          colors[idx + 2] = 0.8;
        } else {
          colors[idx] = 0.1;
          colors[idx + 1] = 0.1;
          colors[idx + 2] = 0.1;
        }
        idx += 3;
      }
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);

    isActive = true;
    animate();

    window.addEventListener('resize', onResize);

    var observer = new MutationObserver(function() {
      updateColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  function updateColors() {
    if (!geometry) return;
    var colorAttr = geometry.attributes.color;
    var colors = colorAttr.array;
    var isDark = getTheme() === 'dark';

    for (var i = 0; i < colors.length; i += 3) {
      if (isDark) {
        colors[i] = 0.8;
        colors[i + 1] = 0.8;
        colors[i + 2] = 0.8;
      } else {
        colors[i] = 0.1;
        colors[i + 1] = 0.1;
        colors[i + 2] = 0.1;
      }
    }
    colorAttr.needsUpdate = true;
  }

  function animate() {
    if (!isActive) return;
    animationId = requestAnimationFrame(animate);

    if (geometry) {
      var posAttr = geometry.attributes.position;
      var pos = posAttr.array;
      var idx = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          pos[idx + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          idx += 3;
        }
      }
      posAttr.needsUpdate = true;
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
    count += 0.1;
  }

  function onResize() {
    if (!camera || !renderer) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function destroy() {
    isActive = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    window.removeEventListener('resize', onResize);
    if (scene) {
      scene.traverse(function(obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(function(m) { m.dispose(); });
          } else {
            obj.material.dispose();
          }
        }
      });
    }
    if (renderer) {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
    scene = null;
    camera = null;
    renderer = null;
    geometry = null;
    material = null;
    points = null;
  }

  return { init: init, destroy: destroy };
})();

document.addEventListener('DOMContentLoaded', function() {
  if (typeof THREE !== 'undefined') {
    DottedSurface.init();
  }
});
