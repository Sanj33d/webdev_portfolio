(() => {
  'use strict';
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeToggle.setAttribute('title', `Switch to ${dark ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = dark ? '#080b14' : '#f4f6fc';
  };
  try {
    const stored = localStorage.getItem('sanjeed-theme-v3');
    setTheme(stored === 'dark' || stored === 'light' ? stored : 'dark');
  } catch { setTheme('dark'); }
  themeToggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('sanjeed-theme-v3', theme); } catch { /* Theme still works without storage. */ }
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  function closeMenu() {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    mobileNav.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuToggle.focus(); }
  });
  window.matchMedia('(min-width: 601px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const email = 'sanjeedshowkat@gmail.com';
  document.querySelector('#copy-email').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Select the email address above to copy it, or click it to send an email.';
    }
  });
  document.querySelector('#year').textContent = new Date().getFullYear();

  // A single motion preference controls CSS, reveals, and pointer response.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionToggle = document.querySelector('.motion-toggle');
  let userPaused = false;
  try { userPaused = localStorage.getItem('sanjeed-motion') === 'paused'; } catch { /* Optional preference. */ }
  const updateMotion = () => {
    const paused = userPaused || reducedMotion.matches;
    root.classList.toggle('motion-paused', paused);
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.setAttribute('aria-label', paused ? 'Resume animations' : 'Pause animations');
    motionToggle.title = paused ? 'Resume animations' : 'Pause animations';
  };
  updateMotion();
  motionToggle.addEventListener('click', () => {
    userPaused = !userPaused;
    try { localStorage.setItem('sanjeed-motion', userPaused ? 'paused' : 'running'); } catch { /* Optional preference. */ }
    updateMotion();
  });
  reducedMotion.addEventListener('change', updateMotion);

  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('.section-heading, .about-grid, .project-card, .timeline article, .education-panel, .skills-grid > div, .contact-grid, .bridge-intro');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    sections.forEach((section, index) => {
      section.classList.add('reveal');
      section.style.setProperty('--reveal-delay', `${index % 3 * 65}ms`);
      revealObserver.observe(section);
    });
    root.classList.add('motion-ready');
    document.addEventListener('focusin', event => event.target.closest('.reveal')?.classList.add('revealed'));
    const animationObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-inview', entry.isIntersecting));
    }, { rootMargin: '60px' });
    document.querySelectorAll('.hero-art, .bridge-lab, .portrait-frame, .research-visual, .project-card').forEach(element => animationObserver.observe(element));
  } else {
    document.querySelectorAll('.hero-art, .bridge-lab, .portrait-frame, .research-visual, .project-card').forEach(element => element.classList.add('is-inview'));
  }

  const heroArt = document.querySelector('.hero-art');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let pointerFrame;
  heroArt.addEventListener('pointermove', event => {
    if (!finePointer.matches || root.classList.contains('motion-paused')) return;
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      heroArt.style.setProperty('--pointer-x', `${x * 10}px`);
      heroArt.style.setProperty('--pointer-y', `${y * 10}px`);
    });
  });
  heroArt.addEventListener('pointerleave', () => {
    cancelAnimationFrame(pointerFrame);
    heroArt.style.setProperty('--pointer-x', '0px');
    heroArt.style.setProperty('--pointer-y', '0px');
  });

  // Progress follows scrolling; no permanent animation loop or external library.
  let scrollFrame = 0;
  const updateProgress = () => {
    const distance = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--page-progress', distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0);
    scrollFrame = 0;
  };
  const queueProgress = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); };
  window.addEventListener('scroll', queueProgress, { passive: true });
  window.addEventListener('resize', queueProgress);
  updateProgress();

  document.querySelectorAll('.project-card').forEach(card => {
    let cardFrame = 0;
    card.addEventListener('pointermove', event => {
      if (!finePointer.matches || root.classList.contains('motion-paused')) return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      cancelAnimationFrame(cardFrame);
      cardFrame = requestAnimationFrame(() => {
        card.style.setProperty('--card-x', `${x * 100}%`);
        card.style.setProperty('--card-y', `${y * 100}%`);
        card.style.setProperty('--tilt-x', `${(x - 0.5) * 5}deg`);
        card.style.setProperty('--tilt-y', `${(0.5 - y) * 4}deg`);
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(cardFrame);
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });

  const connections = {
    industry: {caption: '01 / IDEAS INTO APPLICATIONS', title: 'Engineering that stays curious.', text: 'Building applications, APIs, and database components at Key Pillar AI. Research brings an experimental mindset; teaching brings clarity to how I explain and document the work.', href: '#work', link: 'Explore the work'},
    research: {caption: '02 / QUESTIONS INTO EVIDENCE', title: 'Research grounded in real problems.', text: 'Exploring offline reinforcement learning for vasopressor decision support with MIMIC-IV. Software development supports the implementation; careful evaluation shapes the research questions.', href: '#research', link: 'Explore the research'},
    academia: {caption: '03 / KNOWLEDGE INTO UNDERSTANDING', title: 'Learning that travels beyond the classroom.', text: 'Academic planning, mentoring, and helping students think independently. Explaining complex ideas makes my own engineering and research more deliberate and understandable.', href: '#journey', link: 'Explore the journey'},
    ai: {caption: '04 / INTELLIGENCE WITH RESPONSIBILITY', title: 'A bridge between possibility and reliability.', text: 'From offline reinforcement learning to a medical VQA research proposal, I’m interested in how AI systems can be evaluated for reliability, robustness, and factual consistency.', href: '#research', link: 'Explore the AI focus'}
  };
  const bridge = document.querySelector('.bridge-lab');
  const description = document.querySelector('#bridge-description');
  document.querySelectorAll('.bridge-node').forEach(button => {
    button.addEventListener('click', () => {
      const field = button.dataset.field;
      const content = connections[field];
      bridge.dataset.field = field;
      document.querySelectorAll('.bridge-node').forEach(node => {
        const selected = node === button;
        node.classList.toggle('active', selected);
        node.setAttribute('aria-pressed', String(selected));
      });
      description.querySelector('.bridge-caption').textContent = content.caption;
      description.querySelector('h3').textContent = content.title;
      description.querySelector('p').textContent = content.text;
      const link = description.querySelector('a');
      link.href = content.href;
      link.firstChild.textContent = `${content.link} `;
      if (!root.classList.contains('motion-paused')) {
        description.getAnimations().forEach(animation => animation.cancel());
        description.animate([{opacity: 0.25, transform: 'translateY(7px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 300, easing: 'ease-out'});
      }
    });
  });
})();
