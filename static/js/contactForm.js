document.addEventListener('DOMContentLoaded', () => { 
  const forms = document.querySelectorAll('.contactForm');
  const modalFinal = document.getElementById('formModal');
  const closeBtnFinal = modalFinal.querySelector('.modal-final__close');
  const modalFinalButton = modalFinal.querySelector('.modal-final__button'); 

  const modal = document.getElementById('modal'); 

  console.log('modalFinalButton:', modalFinalButton);

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
      }

      modalFinal.classList.add('active');
      form.reset();
    });
  });

  closeBtnFinal.addEventListener('click', () => {
    modalFinal.classList.remove('active');
  });

  modalFinal.addEventListener('click', (e) => {
    if (e.target === modalFinal) {
      modalFinal.classList.remove('active');
    }
  });

  modalFinalButton.addEventListener('click', (e) => {
    e.preventDefault();
    modalFinal.classList.remove('active');

    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
