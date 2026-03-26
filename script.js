/* ============================================
   SHREE JI SWEETS — Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // -------- Navbar Scroll Effect --------
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // -------- Mobile Menu --------
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');

  const openMenu = () => {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Close menu on link click
  mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // -------- Hero Particles --------
  const particlesContainer = document.getElementById('particles');

  const createParticle = () => {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.animationDelay = (Math.random() * 3) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    p.style.opacity = 0.3 + Math.random() * 0.5;
    particlesContainer.appendChild(p);

    setTimeout(() => p.remove(), 10000);
  };

  // Create initial particles
  for (let i = 0; i < 15; i++) createParticle();
  setInterval(createParticle, 800);

  // -------- Countdown Timer --------
  const setupTimer = () => {
    // Timer counts down from a randomly-reset daily window (resets every visit for urgency)
    let remaining = 8 * 3600 + 45 * 60 + 30; // 8h 45m 30s

    const hoursEl = document.getElementById('timerHours');
    const minutesEl = document.getElementById('timerMinutes');
    const secondsEl = document.getElementById('timerSeconds');

    if (!hoursEl) return;

    const tick = () => {
      if (remaining <= 0) remaining = 8 * 3600 + 45 * 60 + 30; // Reset

      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minutesEl.textContent = String(m).padStart(2, '0');
      secondsEl.textContent = String(s).padStart(2, '0');

      remaining--;
    };

    tick();
    setInterval(tick, 1000);
  };

  setupTimer();

  // -------- Scroll Reveal Animation --------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Add staggered delay to children
        const children = entry.target.querySelectorAll('.menu-card, .review-card, .contact-card, .gallery__item, .trust-item');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
          child.classList.add('visible');
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Also add reveal class to individual cards for staggered animation
  document.querySelectorAll('.menu-card, .review-card, .contact-card, .trust-item').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // -------- Smooth Scroll for Anchor Links --------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -------- Number Counter Animation --------
  const counterElements = document.querySelectorAll('.hero__stat-value');

  const animateCounter = (el) => {
    const text = el.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '').trim();
    const prefix = text.substring(0, text.indexOf(match[1]));
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = text; // Restore original
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  // -------- Floating Button Visibility --------
  const floatingBtns = document.querySelector('.floating-btns');

  const handleFloatingBtnVisibility = () => {
    if (window.scrollY > 300) {
      floatingBtns.style.opacity = '1';
      floatingBtns.style.transform = 'translateY(0)';
      floatingBtns.style.pointerEvents = 'all';
    } else {
      floatingBtns.style.opacity = '0';
      floatingBtns.style.transform = 'translateY(20px)';
      floatingBtns.style.pointerEvents = 'none';
    }
  };

  floatingBtns.style.transition = 'all 0.4s ease';
  floatingBtns.style.opacity = '0';
  floatingBtns.style.transform = 'translateY(20px)';
  floatingBtns.style.pointerEvents = 'none';

  window.addEventListener('scroll', handleFloatingBtnVisibility, { passive: true });

  // -------- Image Lazy Load with Fade --------
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    // If already loaded (from cache)
    if (img.complete) {
      img.style.opacity = '1';
    }
  });

  // -------- Parallax on Hero (subtle, desktop only) --------
  if (window.innerWidth > 768) {
    const heroImg = document.querySelector('.hero__bg img');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroImg.style.transform = `scale(1.05) translateY(${y * 0.15}px)`;
      }
    }, { passive: true });
  }

});
