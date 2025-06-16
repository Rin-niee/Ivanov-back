from django.forms import ModelForm, TextInput, Textarea
from apps.feedback.models import FeedBack

class FeedbackForm(ModelForm):
    class Meta:
        model = FeedBack
        fields = ["name", "number", "message"]

        widgets = {
            "name": TextInput(
                attrs={
                    "class": "form-control fb_name",
                    "placeholder": "Введите имя",
                }
            ),
            "number": TextInput(
                attrs={
                    "class": "form-control fb_phone",
                    "type": "tel",
                    "placeholder": "+7 (___) ___ - __ - __",
                    "pattern": r"^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$",
                }
            ),
            "message": Textarea(
                attrs={
                    'autocomplete': 'off',
                    'class': 'form-control select',
                    'id': 'subjects_form',
                    "placeholder": "Введите текст сообщения, укажите страну, марку и год машины.",
                }
            ),
        }