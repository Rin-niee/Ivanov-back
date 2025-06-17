const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll === 0) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
});
