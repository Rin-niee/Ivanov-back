window.onscroll = function() {
    var a = document.querySelector(".header");
    0 < window.pageYOffset ? a.classList.add("sticky") : a.classList.remove("sticky")
}
