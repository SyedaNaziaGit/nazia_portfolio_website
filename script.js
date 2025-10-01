/* Portfolio JS: theme toggle, mobile menu, form validation, modal, smooth scroll */
(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const resumeBtn = document.getElementById('resume-btn');
  const yearEl = document.getElementById('year');
  const modal = document.getElementById('proj-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');
  const viewBtns = document.querySelectorAll('.view-project');

  // Set current year
  yearEl.textContent = new Date().getFullYear();

  // Theme: read from localStorage or system
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    root.classList.add('light');
    themeToggle.textContent = '🌞';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    root.classList.remove('light');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-pressed', 'false');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '🌞' : '🌙';
    themeToggle.setAttribute('aria-pressed', String(isLight));
  });

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    mobileNav.hidden = open;
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav on selection
        if (!mobileNav.hidden) {
          mobileNav.hidden = true;
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Project modal
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalTitle.textContent = btn.dataset.title || 'Project';
      modalDesc.textContent = btn.dataset.desc || '';
      modal.showModal();
      modal.querySelector('#modal-code').setAttribute('href', '#');
    });
  });
  modalClose.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  // Contact form validation + basic simulated submit
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const successEl = document.getElementById('form-success');

  function validateEmail(email){
    // simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    successEl.hidden = true;

    if (!nameInput.value || nameInput.value.trim().length < 2) {
      nameError.textContent = 'Please enter your name (2+ chars).';
      ok = false;
    }
    if (!validateEmail(emailInput.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      ok = false;
    }
    if (!messageInput.value || messageInput.value.trim().length < 10) {
      messageError.textContent = 'Message must be at least 10 characters.';
      ok = false;
    }

    if (!ok) return;

    // Simulate sending (replace with real API call)
    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
      sentAt: new Date().toISOString()
    };

    // For demo: log and show success
    console.log('Contact form data:', data);
    successEl.hidden = false;
    form.reset();
  });

  // Resume button (replace with actual URL or file)
  resumeBtn.addEventListener('click', () => {
    // For now, open a placeholder new tab; replace with CV link
    window.open('#', '_blank');
  });

  // Accessibility: close modal with Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.open) modal.close();
      if (!mobileNav.hidden) {
        mobileNav.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();
