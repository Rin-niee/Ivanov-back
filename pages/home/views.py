from typing import Any

from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views import View

from pages.home.forms import FeedbackForm
from apps.feedback.models import FeedBack
from apps.content.models import PromoText
from apps.catalog.models import CarsJapan

class HomeView(TemplateView):
    """View для отображения главной страницы"""

    template_name = "home/index.html"
    success_url = "/"

    def get_context_data(self, **kwargs) -> dict[str, Any]:

        context = super().get_context_data(**kwargs)

        context["promo_text"] = PromoText.objects.first()
        context["cars_japan"] = CarsJapan.objects.all()
        context["cars_china"] = CarsJapan.objects.all()
        context["cars_korea"] = CarsJapan.objects.all()
        context["title"] = ''
        context["description"] = ''
        return context
    

class FeedbackView(View):
    def post(self, request, *args, **kwargs):
        form = FeedbackForm(request.POST)
        if form.is_valid():
            # f = FeedBack(
            #     name=form.cleaned_data["name"],
            #     number=form.cleaned_data["number"],
            #     message=form.cleaned_data["message"],
            # )
            # f.save()
            name = form.cleaned_data["name"]
            number = form.cleaned_data["number"]
            message = form.cleaned_data["message"]
            print(f'{name}\n{number}\n{message}')
      

        return JsonResponse({}, status=200)

