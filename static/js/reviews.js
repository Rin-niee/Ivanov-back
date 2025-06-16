
document.addEventListener("DOMContentLoaded", () => {
    var sw = new Swiper(".reviews-swiper", {
        slidesPerView: 'auto',
        spaceBetween: 24,
        navigation: {
            nextEl: ".reviews-swiper-btns .button--next",
            prevEl: ".reviews-swiper-btns .button--prev"
        },
    })
});
