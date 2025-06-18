
// document.querySelectorAll('.delivery__form-select-menu > li > .dropdown-item--cars').forEach(item => {
//     item.addEventListener('click', () => {
//         document.querySelector('.delivery__form-select-btn > .delivery__btn-text').setAttribute('style', `color:rgb(0,0,0) !important`)
//         document.querySelector('.delivery__form-select-btn > .delivery__btn-text').innerHTML = item.dataset.value
//         document.querySelector('.delivery--city').innerHTML = item.dataset.value
//         Click(item)
//     })
// })

// let valuesDelivery = {}

// let Click = (elem) => {
//     elem.dataset.name 
//     elem.dataset.value
//     valuesDelivery[elem.dataset.name] = elem.dataset.value
//     valuesDelivery.car = carBodyType
    
//     let car = valuesDelivery.car
//     let region = valuesDelivery.region
//     let price = document.querySelector('.delivery__form-select-btn').getAttribute('data-price')
//     if (valuesDelivery.car != undefined & valuesDelivery.region != undefined) {
//         console.log('start');
//         const totalPrice = Number(dataDelivery.data[region][car]) + Number(price);
//         document.querySelector('.delivery--count').innerHTML = dataDelivery.data[region][car]
//         document.querySelector('.delivery--price').innerHTML =  totalPrice;
//         od.update(dataDelivery.data[region][car])

//         od_2.update(totalPrice)
        
//     }
// }

// od = new Odometer({
//     el: document.querySelector('.delivery--count'),
//     value: 170000,
//     // Остальные опции передаются в этом же объекте
//     format: '( ddd)',
//     // theme: 'digital'
// });

// od_2 = new Odometer({
//     el: document.querySelector('.delivery--price'),
//     value: Number(170000)+Number(document.querySelector('.delivery__form-select-btn').getAttribute('data-price')),
//     format: '( ddd)',
//     // theme: 'digital'
// });


// let mainRegion = null
// let mainCar = null

// document.querySelectorAll('.main__form-select--menu--auto > li > .dropdown-item--cars').forEach(item => {
//     item.addEventListener('click', () => {
//         document.querySelector('.main__form-select--auto > .main__form-select--button > .main__dropdown-text').setAttribute('style', `color:rgb(0,0,0) !important`)
//         document.querySelector('.main__form-select--auto > .main__form-select--button > .main__dropdown-text').innerHTML = item.dataset.value
//         mainCar = item.dataset.value
//     })
// })



// document.addEventListener("DOMContentLoaded", () => {
//     let initialRegion = "Москва";
//     setTimeout(() => {
//         const regionItem = [...document.querySelectorAll('.delivery__form-select-menu--region > li > .dropdown-item--region')]
//             .find(item => item.dataset.value === initialRegion);
        
//         if (regionItem) {
//             Click(regionItem)
//         }
//     }, 500);
// });

let mainRegion = null
let mainCar = null

document.querySelectorAll('.delivery__form-select-menu > li > .dropdown-item--region').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.delivery__form-select-btn > .delivery__btn-text').setAttribute('style', `color:rgb(0,0,0) !important`)
        document.querySelector('.delivery__form-select-btn > .delivery__btn-text').innerHTML = item.dataset.value
        // document.querySelector('.delivery--city').innerHTML = item.dataset.value;
        // console.log('мяу мяу мяу',item.dataset.value);
        mainRegion = item.dataset.value;
        Click(item)
    })
})

document.querySelectorAll('.delivery__form-select-menu--body > li > .dropdown-item--cars').forEach(item => {
    item.addEventListener('click', () => {
        const button = document.querySelectorAll('.delivery__form-select-btn')[1]; // второй по счёту, для кузова

        button.querySelector('.delivery__btn-text').setAttribute('style', `color:rgb(0,0,0) !important`);
        button.querySelector('.delivery__btn-text').innerHTML = item.dataset.value;

        mainCar = item.dataset.value;
        Click(item)
    });
});

function formatNumberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

let valuesDelivery = {}
let Click = (elem) => {
    
    // console.log(dataDelivery);
    elem.dataset.name 
    elem.dataset.value
    valuesDelivery[elem.dataset.name] = elem.dataset.value
    valuesDelivery.region = mainRegion
    valuesDelivery.car = mainCar
    console.log('дурачок',mainRegion);
    
    let car = valuesDelivery.car
    let region = valuesDelivery.region
    console.log(valuesDelivery.car);
    console.log('пупупу регион', region);
    let price = document.querySelector('.delivery__form-select-btn').getAttribute('data-price')
    if (valuesDelivery.car !== undefined && valuesDelivery.region !== undefined) {
        // console.log('start', dataDelivery);

        // Ищем объект с нужным регионом и машиной
        const item = dataDelivery.find(el => el.city === region && el.body_type === car);
        console.log(item);
        if (item) {
            const deliveryPrice = Number(item.price);
            // const totalPrice = deliveryPrice + Number(price);

            const formatted = formatNumberWithSpaces(deliveryPrice);
            document.querySelector('.delivery--count').innerHTML = formatted;
            // document.querySelector('.delivery--price').innerHTML = totalPrice;

            od.update(deliveryPrice);
            // od_2.update(totalPrice);
        } else {
            console.warn(`Данные для региона "${region}" и машины "${car}" не найдены.`);
            document.querySelector('.delivery--count').innerHTML = '-';
            document.querySelector('.delivery--price').innerHTML = '-';
        }
    }
    
}

od = new Odometer({
    el: document.querySelector('.delivery--count'),
    value: 170000,
    // Остальные опции передаются в этом же объекте
    format: '( ddd)',
    // theme: 'digital'
});

od_2 = new Odometer({
    el: document.querySelector('.delivery--price'),
    value: Number(170000)+Number(document.querySelector('.delivery__form-select-btn').getAttribute('data-price')),
    format: '( ddd)',
    // theme: 'digital'
});






// document.addEventListener("DOMContentLoaded", () => {
//     let initialRegion = "Москва";
//     setTimeout(() => {
//         const regionItem = [...document.querySelectorAll('.delivery__form-select-menu--region > li > .dropdown-item--region')]
//             .find(item => item.dataset.value === initialRegion);
        
//         if (regionItem) {
//             Click(regionItem)
//         }
//     }, 500);
// });