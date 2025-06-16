document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".mini-catlog-swiper-1",{
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: !0,
        pagination: {
            clickable: !0
        },
        navigation: {
            nextEl: ".mini-cataog-1 .button--next",
            prevEl: ".mini-cataog-1 .button--prev"
        },
        breakpoints: {
            0: {
                spaceBetween: 12
            },
            768: {
                spaceBetween: 16
            }
        }
    }),
     new Swiper(".mini-catlog-swiper-2",{
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: !0,
        pagination: {
            clickable: !0
        },
        navigation: {
            nextEl: ".mini-cataog-2 .button--next",
            prevEl: ".mini-cataog-2 .button--prev"
        },
        breakpoints: {
            0: {
                spaceBetween: 12
            },
            768: {
                spaceBetween: 16
            }
        }
    }),
     new Swiper(".mini-catlog-swiper-3",{
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: !0,
        pagination: {
            clickable: !0
        },
        navigation: {
            nextEl: ".mini-cataog-3 .button--next",
            prevEl: ".mini-cataog-3 .button--prev"
        },
        breakpoints: {
            0: {
                spaceBetween: 12
            },
            768: {
                spaceBetween: 16
            }
        }
    })
}
);
var changeCardImage = (e, a, n) => {
    let i = document.querySelector(a + " .main_card_img")
      , t = document.createElement("img");
    console.log(i),
    t.src = e,
    t.alt = "New Image",
    t.width = i.width,
    t.height = i.height,
    t.classList.add("main_card_img"),
    t.onload = () => {
        i.parentNode.replaceChild(t, i)
    }
    ,
    document.querySelectorAll(a + " .pagination .boll").forEach(e => {
        e.classList.remove("active")
    }
    ),
    document.querySelector(a + ` .opener_${n} .boll`).classList.add("active")
}
;
