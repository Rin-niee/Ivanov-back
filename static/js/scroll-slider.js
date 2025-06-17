document.querySelectorAll('.slider-sections').forEach(section => {
  const swiperEl = section.querySelector('.swiper');
  const btnNext = section.querySelector('.next-btn-right');
  const btnPrev = section.querySelector('.next-btn-left');

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: false,
    pagination: {
      clickable: true,
    },
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
    scrollbar: {
      el: section.querySelector('.swiper-scrollbar'),
      draggable: true,
    },
    on: {
      init() {
        updateArrowState(this);
        fixReachEnd(this);
      },
      slideChange() {
        updateArrowState(this);
        fixReachEnd(this);
      },
      resize() {
        updateArrowState(this);
        fixReachEnd(this);
      },
      reachEnd() {
        updateArrowState(this);
      },
      reachBeginning() {
        updateArrowState(this);
      }
    }
  });

  function updateArrowState(swiperInstance) {
    const isBeginning = swiperInstance.isBeginning;
    const isTrueEnd = checkTrueReachEnd(swiperInstance); // наша доп. проверка

    if (btnPrev) {
      btnPrev.style.opacity = isBeginning ? '0.5' : '1';
      btnPrev.style.pointerEvents = isBeginning ? 'none' : 'auto';
      btnPrev.style.cursor = isBeginning ? 'default' : 'pointer';
    }

    if (btnNext) {
      btnNext.style.opacity = isTrueEnd ? '0.5' : '1';
      btnNext.style.pointerEvents = isTrueEnd ? 'none' : 'auto';
      btnNext.style.cursor = isTrueEnd ? 'default' : 'pointer';
    }
  }

  // Проверка, действительно ли последний слайд "встал первым"
  function checkTrueReachEnd(swiper) {
    const lastSlide = swiper.slides[swiper.slides.length - 1];
    const wrapperRect = swiper.el.querySelector('.swiper-wrapper').getBoundingClientRect();
    const lastRect = lastSlide.getBoundingClientRect();

    // Проверяем, находится ли левый край последнего слайда внутри области обёртки
    return lastRect.left >= wrapperRect.left && lastRect.right <= wrapperRect.right;
  }

  function fixReachEnd(swiper) {
    // Обновим isEnd вручную, если нужно
    if (!checkTrueReachEnd(swiper)) {
      swiper.isEnd = false;
    }
  }
});
