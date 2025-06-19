let mainRegion = null;
let mainCar = null;
let od = null;

document.querySelectorAll('.delivery__form-select-menu > li > .dropdown-item--region').forEach(item => {
    item.addEventListener('click', () => {
        const regionBtn = document.querySelector('.delivery__form-select-btn > .delivery__btn-text');
        regionBtn.setAttribute('style', `color:rgb(0,0,0) !important`);
        regionBtn.innerHTML = item.dataset.value;
        mainRegion = item.dataset.value;
        handleDeliveryChange();
    });
});

document.querySelectorAll('.delivery__form-select-menu--body > li > .dropdown-item--cars').forEach(item => {
    item.addEventListener('click', () => {
        const carBtn = document.querySelectorAll('.delivery__form-select-btn')[1];
        carBtn.querySelector('.delivery__btn-text').setAttribute('style', `color:rgb(0,0,0) !important`);
        carBtn.querySelector('.delivery__btn-text').innerHTML = item.dataset.value;
        mainCar = item.dataset.value;
        handleDeliveryChange();
    });
});

function formatNumberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function handleDeliveryChange() {
    if (!mainRegion || !mainCar) return;
    const item = dataDelivery.find(el => el.city === mainRegion && el.body_type === mainCar);
    if (item) {
        const deliveryPrice = Number(item.price);
        const deliveryText = document.querySelector('.delivery-price');
        deliveryText.innerHTML = 'от <span class="counter">0</span> ₽';

        const newCounter = deliveryText.querySelector('.counter');
        newCounter.setAttribute('data-target', deliveryPrice);
        setTimeout(() => {
            const od = new Odometer({
                el: newCounter,
                value: 0,
                format: '( ddd)',
            });
            od.render();
            setTimeout(() => {
                od.update(deliveryPrice);
            }, 10);
        }, 10);
    } else {
        const deliveryText = document.querySelector('.delivery-price');
        deliveryText.innerHTML = 'от <span class="counter">-</span> ₽';
    }
}
