brandInput = document.getElementById('brand-input')
brandInput.addEventListener('input', function () {
    brandInput.classList.remove('font-weight-bold');
    filter = brandInput.value.toLowerCase();
    options = document.querySelectorAll('#brand-dropdown .dropdown-item');

    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(filter) ? 'block' : 'none';
    });
});




let setField = (field, value, text) => {
    var form = document.getElementById('filter-form');

    var input = document.querySelector(`[name=${field}]`);
    input.value = value;

    if (field == "brand") {
        if (text == "Любая" || text == "") {
            // Очистка select с name="model"
            var select = document.querySelector('[name="model"]');
            setField('model', "Модель авто", "");
            document.getElementById('btn-model').disabled = true;
            document.getElementById('btn-model').classList.remove('font-weight-bold');

            document.getElementById('brand-input').value = ''
            document.getElementById('brand-input').classList.remove('font-weight-bold');
        }
        else {
            document.getElementById('btn-model').disabled = false;
            fetchModels(text);

            document.getElementById('brand-input').value = text;
            document.getElementById('brand-input').classList.add('font-weight-bold');
        }
        return
    } else if (field == "sort") {
        document.querySelectorAll('.sort-item').forEach(sort => {
            sort.classList.remove('active');
        });
        document.getElementById(value).classList.add('active');
        form.submit();
        return
    } else if (field == "model") {
        if (text == "Любая" || text == "") {
            document.getElementById('btn-model').classList.remove('font-weight-bold');
            document.getElementById('btn-model').value = ''
        }
        else {
            document.getElementById('btn-model').classList.add('font-weight-bold');
            document.getElementById('btn-model').value = text;
        }
        return
    } else if (field == "color") {
        document.querySelectorAll('.colors_option_item').forEach(color => {
            color.classList.remove('active');
        });
        //document.querySelector(`.no_color svg`).style.display = 'none';

        if (value !== '') {
            document.querySelector(`[title="${value}"]`).classList.add('active');
        } else {
            document.querySelector(`[title="${value}"] svg`).style.display = 'block';
        }
        return
    }

    // Обновить текст в кнопке dropdown
    var dropdown = document.getElementById(`${field}-dropdown`);
    console.log(dropdown)
    console.log(field)

    let button = dropdown.querySelector('.dropdown-toggle');
    console.log(button)
    if (text !== "Любое" && text !== "Модель авто" && text !== "Любой" && text !== "Любая" && text !== "Без сортировки" && text !== "Рейтнг") {
        button.classList.add('font-weight-bold');
    }
    else {
        if (field === "mileage_max" || field === "engine_volume_max" || field === "year_max" || field === "power_max") { text = "До" }
        else { text = "..." }

        button.classList.remove('font-weight-bold');
    }

    if ((field === "engine_volume_min" || field === "engine_volume_max") && (text != 'До 1000' || text != '...')) {
        button.textContent = text + 'л';
    } else if ((field === "mileage_min" || field === "mileage_max") && (text != 'До' || text != '...')) {
        button.textContent = text + 'км';
    } else if ((field === "power_min" || field === "power_max") && (text != 'До' || text != '...')) {
        button.textContent = text + ' л.с.';
    } else {
        button.textContent = text;
    }


};


function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
// Функция для обновления текста кнопки на основе скрытого поля
function updateButtonText(hiddenField, button, value, flag) {
    const value_ = getUrlParameter(value);

    if (value_) {
        hiddenField.value = value_;
        select_text = value_
        if (hiddenField.id === 'id_engine_volume_min' || hiddenField.id === 'id_engine_volume_max') {
            select_text = select_text / 1000 + 'л'
        } else if (hiddenField.id === 'id_power_min' || hiddenField.id === 'id_power_max') {
            select_text = select_text + ' л.с.'
        } else if (hiddenField.id === 'id_mileage_min' || hiddenField.id === 'id_mileage_max') {
            select_text = select_text + ' км'
        } else if (hiddenField.id === 'id_color') {
            document.querySelectorAll('.colors_option_item').forEach(color => {
                color.classList.remove('active');
            });
            if (value_ !== '') {
                document.querySelector(`.colors_options__block [title="${value_}"]`).classList.add('active');
            } else {
                document.querySelector(`.colors_options__block .no_color.colors_option_item svg`).style.display = 'block';
            }
        } else if (hiddenField.id == "id_sort") {
            document.querySelectorAll('.sort-item').forEach(sort => {
                sort.classList.remove('active');
            });
            document.getElementById(value_).classList.add('active');
        }
        if (button) {
            button.textContent = select_text;
            button.classList.add('font-weight-bold');
        }


        if (hiddenField.id === 'id_brand') {
            if (document.querySelector('.auto-brand-items') != null) {
                const inputBrand = document.querySelector(`[data-type="${select_text}"`);
                if (!inputBrand) {
                    click_more_models()   
                }
                document.querySelector(`[data-type="${select_text}"`).classList.add('active')
                
            } 
                const hiddenIndex = document.getElementById('id_model').value;
                const hiddenModel = document.getElementById('id_model');
                const button_model = document.getElementById('btn-model');
                document.getElementById('brand-input').value = value_;
                document.getElementById('brand-input').classList.add('font-weight-bold');
                button_model.disabled = false;

                const currentModelText = button_model.textContent;


                fetchModels(hiddenField.value)
                    .then(() => {
                        if (hiddenIndex) {
                            hiddenModel.value = hiddenIndex
                        }
                        if (hiddenModel.value) {
                            console.log()
                            updateButtonText(hiddenModel, button_model, "", true);
                        } else {
                            button_model.textContent = currentModelText;
                        }
                        console.log('yes');
                    })
                    .catch(error => {
                        console.error('Ошибка при получении моделей:', error);
                    });
            

        } else if (hiddenField.id === 'id_model') {
            model_hidden = document.getElementById('id_model')
            model_hidden.value = value_;
        } else {
            document.getElementById('btn-model').disabled = true;
            hiddenField.selectedIndex = 0;
        }

        if (flag) {
            document.getElementById('btn-model').disabled = false;
        }
        return true
    }
}


const hiddenFields = [
    { hidden: document.getElementById('id_brand'), button: document.getElementById('btn'), value: 'brand' },
    { hidden: document.getElementById('id_model'), button: document.getElementById('btn-model'), value: 'model' },
    { hidden: document.getElementById('id_drive'), button: document.getElementById('btn-drive'), value: 'drive' },
    { hidden: document.getElementById('id_engine_volume_min'), button: document.getElementById('btn-volume'), value: 'engine_volume_min' },
    { hidden: document.getElementById('id_engine_volume_max'), button: document.getElementById('btn-volume2'), value: 'engine_volume_max' },
    { hidden: document.getElementById('id_year_min'), button: document.getElementById('btn-year1'), value: 'year_min' },
    { hidden: document.getElementById('id_year_max'), button: document.getElementById('btn-year2'), value: 'year_max' },
    { hidden: document.getElementById('id_mileage_min'), button: document.getElementById('btn-mileage1'), value: 'mileage_min' },
    { hidden: document.getElementById('id_mileage_max'), button: document.getElementById('btn-mileage2'), value: 'mileage_max' },
    { hidden: document.getElementById('id_transmission'), button: document.getElementById('btn-transmission'), value: 'transmission' },
    { hidden: document.getElementById('id_color'), button: document.getElementById('btn-color'), value: 'color' },
    { hidden: document.getElementById('id_sort'), button: document.getElementById('btn-sort'), value: 'sort' },
    { hidden: document.getElementById('id_engine_type'), button: document.getElementById('btn-engine_type'), value: 'engine_type' },
    { hidden: document.getElementById('id_rubber'), button: document.getElementById('btn-rubber'), value: 'rubber' },
    { hidden: document.getElementById('id_power_min'), button: document.getElementById('btn-power_min'), value: 'power_min' },
    { hidden: document.getElementById('id_power_max'), button: document.getElementById('btn-power_max'), value: 'power_max' },
    { hidden: document.getElementById('id_body_type'), button: document.getElementById('body_type'), value: 'body_type' },
];

document.addEventListener("DOMContentLoaded", function () {
    count = 0
    hiddenFields.forEach(({ hidden, button, value }) => {
        document.getElementById('btn-model').disabled = true;
        flag = updateButtonText(hidden, button, value);

        // if(flag){
        //     count = count + 1
        // }
    });
    // document.getElementById('btn-model').disabled = true;
    // check_img();

    // if(count > 0){
    //     console.log(count)
    //     document.querySelector('.catalog__filter-parametrs--count').textContent  = count
    //     document.querySelector('.catalog__filter-parametrs--count').style.display = 'block'
    // }else{
    //     document.querySelector('.catalog__filter-parametrs--count').style.display = 'none'
    // }

});

function formatNumber(input) {
    // Убираем все нечисловые символы (кроме цифр и запятой)
    let value = input.value.replace(/[^\d]/g, '');

    // Разделяем число на разряды с разделителем
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    input.value = value;
}

modelInput = document.getElementById('btn-model')
modelInput.addEventListener('input', function () {
    modelInput.classList.remove('font-weight-bold');
    filter = modelInput.value.toLowerCase();
    options = document.querySelectorAll('#model-dropdown .dropdown-item');

    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(filter) ? 'block' : 'none';
    });
});

function getAgeRangeByYear(year) {
    const currentYear = new Date().getFullYear();

    const age = currentYear - year;

    if (age < 3) {
        return 'меньше 3-х лет';
    } else if (age >= 3 && age <= 5) {
        return '3-5 лет';
    } else if (age > 5 && age <= 7) {
        return '5-7 лет';
    } else {
        return 'более 7 лет';
    }
}


document.querySelectorAll('.detailed_calculation').forEach((button) => {
    button.addEventListener('click', function () {
        const formData = new FormData();
        if (Moto){
            formData.append('id', button.getAttribute('data-id'));
        }else{
            let eng_type = button.getAttribute('data-engine')
            if (eng_type === 'Электро') {
                eng_type = 'Электрический'
            } else if (eng_type === 'Гибрид' || eng_type === 'PLUG-IN-гибрид') {
                eng_type = 'Бензиновый и электрический'
            } else {
                eng_type = 'Бензиновый'
            }
            
            
            formData.append('price', button.getAttribute('data-price'));
            formData.append('country', button.getAttribute('data-country'));
            formData.append('volume', button.getAttribute('data-volume'));
            formData.append('power', button.getAttribute('data-power'));
            formData.append('eng_type', eng_type);
            formData.append('age', getAgeRangeByYear(button.getAttribute('data-year')));
            formData.append('user_type', 'Физическое лицо');
        }
        


        fetch(`${calcUrl}`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                document.querySelector('#madalPrice .calculator-rezult').innerHTML = data.rezult_html;
                $('#madalPrice').modal('show');
            })
            .catch(error => {
                console.error("Ошибка:", error);
                alert(error.message);
            });
    })
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.querySelector('.catalog__filter-parametrs').addEventListener('click', function(){
    document.querySelector('.index-catalog-wrp').style.display = 'block'
    document.querySelector('.index-catalog-wrp').style.zIndex = '9999'
})

document.querySelector('#index_catalog .btn-close').addEventListener('click', function(){
    document.querySelector('.index-catalog-wrp').style.display = 'none'
    document.querySelector('.index-catalog-wrp').style.zIndex = '-1'
})