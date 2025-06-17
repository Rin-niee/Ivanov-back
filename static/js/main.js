document.querySelectorAll('.splide').forEach((slider) => {
  const splide = new Splide(slider, {
    type: 'slide',
    perPage: 3,
    perMove: 1,
    focus: 0,
    gap: '20px',
    pagination: false,
    arrows: false,
    updateOnMove: true,
    trimSpace: false,
  });

  splide.mount();

  const container = slider.closest('.slider-section');
  const arrowLeft = container?.querySelector('.arrow-left');
  const arrowRight = container?.querySelector('.arrow-right');

  if (arrowLeft && arrowRight) {
    arrowLeft.addEventListener('click', () => splide.go('<'));
    arrowRight.addEventListener('click', () => splide.go('>'));

    splide.on('moved', () => {
    const atStart = splide.index === 0;
    const atEnd = splide.index >= splide.length - splide.options.perPage;

    arrowLeft.style.opacity = atStart ? '0.5' : '1';
    arrowLeft.style.cursor = atStart ? 'default' : 'pointer';
    arrowLeft.classList.toggle('is-disabled', atStart);

    arrowRight.style.opacity = atEnd ? '0.5' : '1';
    arrowRight.style.cursor = atEnd ? 'default' : 'pointer';
    arrowRight.classList.toggle('is-disabled', atEnd);
  });


    splide.emit('moved');
  }
});
