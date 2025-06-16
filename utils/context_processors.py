from pages.home.forms import FeedbackForm

from apps.about.models import Social, Contacts

def get_base_context(request):

    context = {
        "feedback": FeedbackForm,
        "whatsapp": Social.objects.get(name='WhatsApp').url,
        "telegram": Social.objects.get(name='Telegram').url,
        "phone": Contacts.objects.first().number,
        "phone_url": Contacts.objects.first().number.replace('-', '').replace('(', '').replace(')', '').replace(' ', ''),
        "lid_info": Contacts.objects.first(),
    }

    return context