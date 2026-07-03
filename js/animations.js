document.addEventListener('DOMContentLoaded', () => {
  // Reveal-on-scroll
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));

  // Skill progress animation
  const progressBars = document.querySelectorAll('.progress > span[data-progress]');
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = entry.target.getAttribute('data-progress') || '0';
          entry.target.style.width = `${value}%`;
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  progressBars.forEach((bar) => progressObserver.observe(bar));

  // Parallax effect
  const parallaxElements = document.querySelectorAll('.parallax');
  const onParallax = () => {
    const y = window.scrollY;
    parallaxElements.forEach((el) => {
      const speed = Number(el.getAttribute('data-speed') || 0.12);
      el.style.setProperty('--parallax-shift', `${y * speed * -1}px`);
    });
  };

  onParallax();
  window.addEventListener('scroll', onParallax, { passive: true });

  // Mouse spotlight
  const spotlight = document.getElementById('spotlight');
  if (spotlight) {
    document.addEventListener('mousemove', (e) => {
      spotlight.style.opacity = '1';
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
  }
});
