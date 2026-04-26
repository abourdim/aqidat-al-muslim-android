/* ═══════════════ GENIUS SHARED JS ═══════════════ */
/* Include in all 6 apps — call geniusInit(config) after DOM ready */
/* config = { particles: {color1, color2, count}, appKey: 'jh', darkTheme: 'night' } */

(function(){
'use strict';

window.geniusInit = function(cfg) {
  cfg = cfg || {};
  initParticles(cfg.particles || {});
  initPageTransitions();
  initScrollReveal();
  initSwipeNav();
  initReadingMode();
  initAutoDarkMode(cfg.appKey || 'app', cfg.darkTheme || 'night');
  initHaptics();
  initSkeletonLoading();
  initAnimatedCounters();
};

// ═══════════════ 1. FLOATING PARTICLES ═══════════════
function initParticles(pcfg) {
  var c = document.createElement('canvas');
  c.id = 'particlesCanvas';
  document.body.insertBefore(c, document.body.firstChild);
  var ctx = c.getContext('2d');
  var particles = [];
  var count = pcfg.count || 20;
  var color1 = pcfg.color1 || 'rgba(255,140,97,0.3)';
  var color2 = pcfg.color2 || 'rgba(79,195,247,0.2)';

  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.5 - 0.1,
      color: Math.random() > 0.5 ? color1 : color2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -10) { p.y = c.height + 10; p.x = Math.random() * c.width; }
      if (p.x < -10) p.x = c.width + 10;
      if (p.x > c.width + 10) p.x = -10;
    }
    requestAnimationFrame(draw);
  }
  // Respect reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw();
  }
}

// ═══════════════ 2. PAGE TRANSITIONS ═══════════════
function initPageTransitions() {
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var activePanel = document.querySelector('.panel.active');
      var targetId = 'panel-' + tab.dataset.tab;
      var targetPanel = document.getElementById(targetId);
      if (!targetPanel || targetPanel === activePanel) return;

      if (activePanel) {
        activePanel.classList.add('panel-exit');
        activePanel.addEventListener('animationend', function handler() {
          activePanel.classList.remove('active', 'panel-exit');
          activePanel.removeEventListener('animationend', handler);
          targetPanel.classList.add('active', 'panel-enter');
          targetPanel.addEventListener('animationend', function h2() {
            targetPanel.classList.remove('panel-enter');
            targetPanel.removeEventListener('animationend', h2);
          });
        });
      }
    });
  });
}

// ═══════════════ 3. SCROLL REVEAL ═══════════════
function initScrollReveal() {
  // Tag all major cards
  var selectors = [
    '.principle-card','.anxiety-card','.myth-card','.truth-card',
    '.ailment-card','.remedy-card','.essay-card','.timeline-card',
    '.cause-card','.solution-card','.quiz-question','.habit-item',
    '.home-card','.explore-card','.comparison-card','.scenario-card',
    '.expand-card','.about-section','.about-author','.about-disclaimer',
    '.daily-card','.daily-tip-card','.dua'
  ].join(',');

  function tagElements() {
    document.querySelectorAll(selectors).forEach(function(el) {
      if (!el.classList.contains('genius-reveal') && !el.classList.contains('revealed')) {
        el.classList.add('genius-reveal');
      }
    });
  }
  tagElements();
  // Re-tag after renders
  var observer = new MutationObserver(function() { setTimeout(tagElements, 100); });
  observer.observe(document.querySelector('.content') || document.body, { childList: true, subtree: true });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    function observe() {
      document.querySelectorAll('.genius-reveal:not(.revealed)').forEach(function(el) {
        io.observe(el);
      });
    }
    observe();
    setInterval(observe, 1000); // catch dynamically added elements
  }
}

// ═══════════════ 4. SWIPE NAVIGATION ═══════════════
function initSwipeNav() {
  var startX = 0, startY = 0;
  var content = document.querySelector('.content') || document.body;

  content.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  content.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return; // too short or vertical

    var tabs = Array.from(document.querySelectorAll('.tab'));
    var activeIdx = tabs.findIndex(function(t) { return t.classList.contains('active'); });
    if (activeIdx < 0) return;

    var isRTL = document.documentElement.dir === 'rtl';
    var next;
    if (dx < -60) { // swipe left
      next = isRTL ? activeIdx - 1 : activeIdx + 1;
    } else if (dx > 60) { // swipe right
      next = isRTL ? activeIdx + 1 : activeIdx - 1;
    }
    if (next >= 0 && next < tabs.length) {
      tabs[next].click();
      try { navigator.vibrate(8); } catch(e) {}
    }
  }, { passive: true });
}

// ═══════════════ 5. READING MODE ═══════════════
function initReadingMode() {
  var btn = document.createElement('button');
  btn.className = 'reading-toggle';
  btn.innerHTML = '📖';
  btn.title = 'Reading Mode';
  btn.setAttribute('aria-label', 'Toggle reading mode');
  document.body.appendChild(btn);

  btn.addEventListener('click', function() {
    document.body.classList.toggle('reading-mode');
    btn.innerHTML = document.body.classList.contains('reading-mode') ? '✕' : '📖';
    try { navigator.vibrate(10); } catch(e) {}
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('reading-mode')) {
      document.body.classList.remove('reading-mode');
      btn.innerHTML = '📖';
    }
  });
}

// ═══════════════ 6. AUTO DARK MODE ═══════════════
function initAutoDarkMode(appKey, darkTheme) {
  var themeKey = appKey + '-theme';
  if (!localStorage.getItem(themeKey)) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', darkTheme);
      localStorage.setItem(themeKey, darkTheme);
    }
  }
}

// ═══════════════ 7. HAPTIC FEEDBACK ═══════════════
function initHaptics() {
  document.addEventListener('click', function(e) {
    var el = e.target.closest('button, .tab, .home-card, .explore-card');
    if (el) { try { navigator.vibrate(8); } catch(e) {} }
  });
}

// ═══════════════ 8. SKELETON LOADING — disabled (causes content loss) ═══════════════
function initSkeletonLoading() { /* disabled */ }

// ═══════════════ 9. ANIMATED COUNTERS ═══════════════
function initAnimatedCounters() {
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        animateCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  function scan() {
    document.querySelectorAll('[data-count-to]').forEach(function(el) {
      io.observe(el);
    });
  }
  scan();
  setInterval(scan, 2000);
}

function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-count-to'), 10);
  if (isNaN(target)) return;
  var current = 0;
  var step = Math.ceil(target / 40);
  var timer = setInterval(function() {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current;
  }, 30);
}

// ═══════════════ 10. EASTER EGG ═══════════════
window.showEasterEgg = function(emoji, title, text) {
  var div = document.createElement('div');
  div.className = 'easter-egg';
  div.innerHTML = '<div class="easter-egg-inner">' +
    '<div class="ee-emoji">' + (emoji || '🌟') + '</div>' +
    '<div class="ee-title">' + (title || 'Congratulations!') + '</div>' +
    '<div class="ee-text">' + (text || '') + '</div>' +
    '<button class="ee-close" onclick="this.closest(\'.easter-egg\').remove()">✨</button>' +
    '</div>';
  document.body.appendChild(div);
  div.querySelector('.easter-egg-inner').addEventListener('click', function(e) { e.stopPropagation(); });
  div.addEventListener('click', function() { div.remove(); });
};

})();
