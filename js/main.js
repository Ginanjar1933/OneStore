/* =====================================================
   ONE STORE — Main JavaScript
   Navbar, Mobile Drawer, Scroll Animations,
   Micro-interactions, Global behaviors
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     NAVBAR — Scroll Behavior
     =================================================== */
  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on init

  /* ===================================================
     NAVBAR — Active Link Detection
     =================================================== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ===================================================
     MOBILE DRAWER
     =================================================== */
  const hamburger     = document.querySelector('.hamburger');
  const mobileDrawer  = document.querySelector('.mobile-drawer');
  const drawerClose   = document.querySelector('.drawer-close');
  const overlay       = document.querySelector('.overlay');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    hamburger?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    hamburger?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    if (mobileDrawer?.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerClose?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // Close drawer on link click
  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close with Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeSearch();
    }
  });

  /* ===================================================
     SEARCH OVERLAY
     =================================================== */
  const searchToggle  = document.querySelector('.search-toggle-btn');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose   = document.querySelector('.search-close-btn');
  const searchInput   = document.querySelector('.search-input');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('active');
    if (!mobileDrawer?.classList.contains('open')) {
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);

  // Search input — filter on enter
  searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) {
        window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
      }
    }
  });

  // Simple search suggestions
  const suggestions = document.querySelector('.search-suggestions');
  if (searchInput && suggestions) {
    const popularSearches = [
      'Kemeja Pria', 'Dress Wanita', 'Sneakers', 'Hoodie', 'Tas Tote',
      'Celana Chino', 'Jaket', 'Aksesoris', 'Baju Anak', 'Sandal'
    ];

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        suggestions.classList.remove('show');
        return;
      }
      const matched = popularSearches.filter(s => s.toLowerCase().includes(q));
      if (matched.length === 0) {
        suggestions.classList.remove('show');
        return;
      }
      suggestions.innerHTML = matched.map(s => `
        <div class="search-suggestion-item" onclick="window.location.href='shop.html?search=${encodeURIComponent(s)}'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          ${s}
        </div>
      `).join('');
      suggestions.classList.add('show');
    });

    document.addEventListener('click', e => {
      if (!searchOverlay?.contains(e.target)) {
        suggestions.classList.remove('show');
      }
    });
  }

  /* ===================================================
     SCROLL ANIMATIONS (IntersectionObserver)
     =================================================== */
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  /* ===================================================
     CART BADGE — Cart bounce animation CSS injection
     =================================================== */
  if (!document.getElementById('cart-bounce-style')) {
    const style = document.createElement('style');
    style.id = 'cart-bounce-style';
    style.textContent = `
      @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        30% { transform: scale(0.85); }
        60% { transform: scale(1.15); }
      }
      .cart-bounce {
        animation: cartBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .wishlisted svg {
        fill: var(--color-danger) !important;
        stroke: var(--color-danger) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* ===================================================
     SMOOTH SCROLL for anchor links
     =================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ===================================================
     LAZY LOADING FALLBACK for images
     =================================================== */
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('error', () => {
      img.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80';
    });
  });

  /* ===================================================
     BACK TO TOP BUTTON
     =================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================
     QUANTITY STEPPERS (global handler)
     =================================================== */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;

    const stepper = btn.closest('.qty-stepper');
    const input   = stepper?.querySelector('.qty-value');
    if (!input) return;

    const current = parseInt(input.value) || 1;
    const min     = parseInt(input.min) || 1;
    const max     = parseInt(input.max) || 99;

    if (btn.dataset.action === 'minus') {
      input.value = Math.max(current - 1, min);
    } else if (btn.dataset.action === 'plus') {
      input.value = Math.min(current + 1, max);
    }

    // Trigger change event
    input.dispatchEvent(new Event('change', { bubbles: true }));

    // Bounce animation
    input.animate([
      { transform: 'scale(1.15)' },
      { transform: 'scale(1)' }
    ], { duration: 200, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
  });

  /* ===================================================
     USER NAV — Show name if logged in
     =================================================== */
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userNavBtn = document.querySelector('.nav-user-btn');

  if (user && userNavBtn) {
    const loginBtn = document.querySelector('.nav-login-btn');
    if (loginBtn) {
      loginBtn.href = 'profile.html';
      loginBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="login-text">${user.name.split(' ')[0]}</span>
      `;
    }
  }

  /* ===================================================
     NEWSLETTER FORM
     =================================================== */
  const newsletterForm = document.querySelector('.newsletter-form-el');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input?.value) {
        showToast('Berhasil!', 'Terima kasih telah berlangganan newsletter kami!', 'success');
        input.value = '';
      }
    });
  }

  /* ===================================================
     REVEAL HERO elements immediately
     =================================================== */
  setTimeout(() => {
    document.querySelectorAll('.hero-animate').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 100);

});

/* =====================================================
   UTILITY — Format number with dot separator (ID)
   ===================================================== */
function formatNumber(num) {
  return num.toLocaleString('id-ID');
}

window.formatNumber = formatNumber;
