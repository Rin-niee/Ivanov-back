var swiper = new Swiper(".recomindation__swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    1088: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1088: {
      slidesPerView: 2.5,
      spaceBetween: 30
    },
    576: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 1.5,
    },
    
    0: {
      slidesPerView: 1.1,
      spaceBetween: 15
    }
  }
});