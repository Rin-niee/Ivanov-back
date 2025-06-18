document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 2000, 1);
      counter.textContent = Math.floor(target * progress).toLocaleString("ru-RU");
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target.toLocaleString("ru-RU");
      }
    };

    requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCounter(counter);
        observer.unobserve(counter); // запускаем только один раз
      }
    });
  }, {
    threshold: 0.5 // запустится, когда видно хотя бы 50% элемента
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});
