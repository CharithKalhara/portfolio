document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const progress = document.getElementById('scrollProgress');
  const header = document.getElementById('siteHeader');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Hide loading screen
  window.setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.pointerEvents = 'none';
    window.setTimeout(() => loadingScreen.remove(), 400);
  }, 1000);

  // Mobile menu
  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click
  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Sticky nav style + progress + back button
  const updateScrollUI = () => {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = h > 0 ? (y / h) * 100 : 0;

    progress.style.width = `${ratio}%`;
    backToTop.classList.toggle('show', y > 500);
    header.style.borderBottomColor = y > 8 ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.14)';
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Contact form (front-end placeholder)
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      formStatus.textContent = 'Please complete all required fields.';
      return;
    }
    formStatus.textContent = 'Thank you! Your message has been captured locally.';
    form.reset();
  });

  // Typewriter subtitle
  const typing = document.querySelector('.typing');
  if (typing) {
    const fullText = typing.getAttribute('data-text') || '';
    let i = 0;
    const tick = () => {
      typing.textContent = fullText.slice(0, i);
      i += 1;
      if (i <= fullText.length) window.setTimeout(tick, 35);
    };
    tick();
  }
});
