(function () {
  const cards = Array.from(document.querySelectorAll('.card'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  const screens = cards.map((card) => {
    const img = card.querySelector('img');
    const label = card.querySelector('figcaption').textContent.trim();
    return { src: img.src, alt: img.alt, label };
  });

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lbClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const screen = screens[currentIndex];
    lbImage.src = screen.src;
    lbImage.alt = screen.alt;
    lbCaption.textContent = screen.label;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + screens.length) % screens.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % screens.length;
    updateLightbox();
  }

  cards.forEach((card, index) => {
    card.querySelector('.card-open').addEventListener('click', () => openLightbox(index));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();
