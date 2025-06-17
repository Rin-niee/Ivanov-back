document.querySelectorAll('.custom-select').forEach(select => {
  const header = select.querySelector('.custom-select__header');
  const body = select.querySelector('.custom-select__body');
  const options = select.querySelectorAll('.custom-select__option');

  header.addEventListener('click', () => {
    select.classList.toggle('active');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      header.textContent = option.textContent;

      options.forEach(opt => opt.classList.remove('custom-select__option--selected'));
      option.classList.add('custom-select__option--selected');

      header.classList.add('selected');

      select.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove('active');
    }
  });
});
