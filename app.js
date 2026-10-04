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

  // Download Trigger Handler
  window.triggerDownload = function (filename, appName) {
    showToast(`Starting download: ${appName} (${filename})...`);
  };
});
