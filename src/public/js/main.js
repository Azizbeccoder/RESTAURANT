// ============================================================
// public/js/main.js
// Burak Restaurant — Frontend JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll shadow ──────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Hamburger menu ────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate bars
      const bars = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });

    // Close menu on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });
  }

  // ── Form validation ───────────────────────────────────────
  const loginForm  = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  function showError(input, message) {
    input.classList.add('error');
    let err = input.parentElement.querySelector('.field-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'field-error';
      err.style.cssText = 'color:var(--red);font-size:0.78rem;margin-top:0.3rem;';
      input.parentElement.appendChild(err);
    }
    err.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('error');
    const err = input.parentElement.querySelector('.field-error');
    if (err) err.remove();
  }

  // Live validation: clear error on input
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      const nick = loginForm.querySelector('#memberNick');
      const pass = loginForm.querySelector('#memberPassword');
      let valid = true;

      if (!nick.value.trim()) { showError(nick, 'Username is required'); valid = false; }
      if (!pass.value.trim()) { showError(pass, 'Password is required'); valid = false; }

      if (!valid) e.preventDefault();
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      const nick  = signupForm.querySelector('#memberNick');
      const phone = signupForm.querySelector('#memberPhone');
      const pass  = signupForm.querySelector('#memberPassword');
      let valid = true;

      if (!nick.value.trim() || nick.value.length < 3) {
        showError(nick, 'Username must be at least 3 characters'); valid = false;
      }
      if (!phone.value.trim()) {
        showError(phone, 'Phone number is required'); valid = false;
      }
      if (!pass.value.trim() || pass.value.length < 6) {
        showError(pass, 'Password must be at least 6 characters'); valid = false;
      }

      if (!valid) e.preventDefault();
    });
  }

  // ── Intersection Observer — fade-up animation ─────────────
  const fadeEls = document.querySelectorAll('.card, .testimonial-card, .feature-item');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      io.observe(el);
    });
  }

});
