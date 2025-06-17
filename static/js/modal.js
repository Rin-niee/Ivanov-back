const modal = document.getElementById('modal');
const openButtons = document.querySelectorAll('.modal-open'); 
const closeBtn = modal.querySelector('.modal__close');
const overlay = modal.querySelector('.modal__overlay');

openButtons.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

overlay.addEventListener('click', () => {
  modal.classList.remove('active');
});
