/**
 * js/main.js
 
 */

document.addEventListener('DOMContentLoaded', function () {
  /* -----------------------------------
     SMOOTH SCROLL
  ----------------------------------- */
  const seeBtn = document.getElementById('seePatterns');
  if (seeBtn) {
    seeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* -----------------------------------
     FOOTER YEAR
  ----------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -----------------------------------
     SIGNALS GRID PREVIEW
  ----------------------------------- */
  const signalsGrid = document.getElementById('signalsGrid');
  const preview = document.getElementById('signalPreview');
  if (signalsGrid && preview) {
    signalsGrid.addEventListener('mouseover', handleNodeHover);
    signalsGrid.addEventListener('focusin', handleNodeHover);
    signalsGrid.addEventListener('mouseout', () => preview.textContent = '');
    signalsGrid.addEventListener('focusout', () => preview.textContent = '');
  }

  function handleNodeHover(e) {
    const node = e.target.closest('.node');
    if (!node) return;
    const title = node.getAttribute('data-title') || 'Signal preview';
    preview.textContent = title;
  }

  /* -----------------------------------
     HERO PARALLAX EFFECT
  ----------------------------------- */
  const hero = document.getElementById('hero');
  window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    if (hero) {
      const net = document.getElementById('networkCanvas');
      if (net) {
        net.style.transform = `translate3d(0, ${scrolled * -0.02}px, 0)`;
      }
      const vid = document.querySelector('.hero__video');
      if (vid) {
        const scale = 1 + Math.min(scrolled / 4000, 0.02);
        vid.style.transform = `scale(${scale})`;
      }
    }
  });

  

  /* -----------------------------------
     REVEAL ANIMATIONS
  ----------------------------------- */
  (function revealOnScroll() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.section, .process__card, .node, .purpose__text')
      .forEach(el => obs.observe(el));
  })();

/* -----------------------------------
   WATCHTOWER NETWORK VISUALIZATION
----------------------------------- */
(function networkVisualization() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let points = [];

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Create random network nodes
  const POINT_COUNT = 80;
  for (let i = 0; i < POINT_COUNT; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < POINT_COUNT; i++) {
      for (let j = i + 1; j < POINT_COUNT; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = 1 - dist / 120;
          ctx.strokeStyle = `rgba(61, 131, 255, ${alpha * 0.3})`; // soft blue glow
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw points
    for (let p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100, 180, 255, 0.8)';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    requestAnimationFrame(draw);
  }

  draw();
})();



});
