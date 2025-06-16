phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(function (input) {
    var phoneMask = IMask(input, {
        mask: '+{7} (000) 000-00-00'
    });

    input.addEventListener('input', function () {
        const firstDigit = input.value.match(/\+7 \((\d)/);

        if (firstDigit && (firstDigit[1] === '8' || firstDigit[1] === '7')) {
            input.setCustomValidity("Номер не должен начинаться с 8 или 7 после кода +7.");
            input.reportValidity();
        } else {
            input.setCustomValidity("");
        }
    });
});

const setModalInput = (text) => {document.querySelector("#feedback-modal textarea").value = text;};



$('#contact-feedback-form').on('submit', function (event) {
    send_feedback_preparation(event, $(this))
});


$('#feedback-modal').on('submit', function (event) {
    send_feedback_preparation(event, $(this), 'modal')
});

function send_feedback_preparation(event, form, block=null){
    event.preventDefault(); 
    const formData = form.serialize();
    sendFeedBAck(formData, block)
    form.trigger('reset');
}

function sendFeedBAck(formData, block = null) {
    $.ajax({
        data: formData,
        type: 'POST',
        datatype: "json",
        url: "/feedback/",
        success: function(response) {
            ym(100976661,'reachGoal','send_form')
            if(block === 'modal'){
                $('#modalFeedback').modal('hide');  
            }

            $('#successFeedback').modal('show');  

            setTimeout(() => {
                $('#successFeedback').modal('hide');     
            }, 5000);

        },
        error: function(error) {
            console.error("Ошибка при отправке формы:", error);
        }
    });
}