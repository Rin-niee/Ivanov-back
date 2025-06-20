const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // Тень — убираем, если на самом верху
  if (currentScroll === 0) {
    header.classList.add('no-shadow');
    header.classList.add('hide'); // скрываем, если нужно
  } else {
    header.classList.remove('no-shadow');
    header.classList.remove('hide'); // показываем при скролле вниз
  }
});
