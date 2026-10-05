/**
 * Helix Ecosystem Global Interactivity, Scroll Reveal & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
          lucide.createIcons();
        }
      }
    });

    // Close mobile menu when a nav link is clicked
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
          }
        }
      });
    });
  }

  // IntersectionObserver for Apple-style Scroll Reveal
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Checksum & Code Copy to Clipboard
  window.copyChecksum = function (checksum, btnElement) {
    navigator.clipboard.writeText(checksum).then(() => {
      const origHtml = btnElement.innerHTML;
      btnElement.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;"></i> Copied';
      btnElement.style.borderColor = '#10b981';
      btnElement.style.color = '#10b981';
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
      showToast('SHA-256 Checksum copied to clipboard!');
      setTimeout(() => {
        btnElement.innerHTML = origHtml;
        btnElement.style.borderColor = '';
        btnElement.style.color = '';
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
          lucide.createIcons();
        }
      }, 2000);
    });
  };

  window.copyCode = function (text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      const origHtml = btnElement.innerHTML;
      btnElement.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;"></i> Copied';
      btnElement.style.borderColor = '#10b981';
      btnElement.style.color = '#10b981';
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
      showToast('Command copied to clipboard!');
      setTimeout(() => {
        btnElement.innerHTML = origHtml;
        btnElement.style.borderColor = '';
        btnElement.style.color = '';
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
          lucide.createIcons();
        }
      }, 2000);
    });
  };

  // Toast Notification
  window.showToast = function (msg) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3200);
  };

  // Platform-detected download label (Stremio-style)
  const ua = navigator.userAgent || '';
  let osLabel = '';
  if (/Windows/i.test(ua)) osLabel = 'Windows';
  else if (/Android/i.test(ua)) osLabel = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) osLabel = 'iOS';
  else if (/Macintosh|Mac OS X/i.test(ua)) osLabel = 'macOS';
  else if (/Linux/i.test(ua)) osLabel = 'Linux';

  if (osLabel) {
    ['hero-download-btn', 'cta-download-btn'].forEach((id) => {
      const btn = document.getElementById(id);
      const label = btn && btn.querySelector('span');
      if (label) {
        label.textContent = `Download for ${osLabel}`;
      }
    });
  }

  // Download Trigger Handler
  window.triggerDownload = function (filename, appName) {
    showToast(`Starting download: ${appName} (${filename})...`);
  };

  // Navbar scroll state — floating capsule deepens on scroll
  const navbar = document.querySelector('.site-navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Footer "Back to top"
  document.querySelectorAll('.back-to-top').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ----- Interactive motion layer -----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Cursor spotlight on feature cards
  document.querySelectorAll('.glass-feature-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });

  if (canHover && !prefersReducedMotion) {
    // Magnetic primary CTAs
    document.querySelectorAll('.btn-cta-primary').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // Ecosystem tabs — click + auto-rotate with progress bar
  const ecoTabs = document.querySelectorAll('.eco-tab');
  if (ecoTabs.length) {
    const tabNames = [...ecoTabs].map((t) => t.dataset.tab);
    let ecoIndex = 0;
    let ecoTimer = null;

    const activateEco = (name) => {
      ecoTabs.forEach((t) => {
        const on = t.dataset.tab === name;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      document.querySelectorAll('.eco-panel, .eco-link').forEach((p) => {
        p.classList.toggle('active', p.dataset.panel === name);
      });
    };

    const startAuto = () => {
      if (prefersReducedMotion) return;
      clearInterval(ecoTimer);
      ecoTimer = setInterval(() => {
        ecoIndex = (ecoIndex + 1) % tabNames.length;
        activateEco(tabNames[ecoIndex]);
      }, 5500);
    };

    ecoTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        ecoIndex = i;
        activateEco(tab.dataset.tab);
        startAuto();
      });
    });

    startAuto();
  }

  // Count-up stats
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    statNums.forEach((el) => counterObserver.observe(el));
  } else {
    statNums.forEach((el) => {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
  }
});
