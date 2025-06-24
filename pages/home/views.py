import json
from typing import Any

from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from django.views import View

from pages.home.forms import FeedbackForm
from apps.feedback.models import FeedBack
from apps.content.models import PromoText
from apps.catalog.models import *
from django.shortcuts import render


def custom_404_view(request, exception):
    return render(request, '404error.html', status=404)

class HomeView(TemplateView):
    """View для отображения главной страницы"""
    template_name = "home/index.html"
    success_url = "/"

    def get_context_data(self, **kwargs) -> dict[str, Any]:
        delivery_list = []
        prices = car_delivery_prices.objects.select_related("city_id", "car_type_id")

        for price_obj in prices:
            delivery_list.append({
                "city": price_obj.city_id.city_name,
                "body_type": price_obj.car_type_id.car_types_name,
                "price": price_obj.price,
                "distance": price_obj.city_id.distance_from_vladivostok,
                "duration": price_obj.city_id.delivery_time_days
            })
        context = super().get_context_data(**kwargs)
        context["promo_text"] = PromoText.objects.first()
        context["cars_japan"] = CarsJapan.objects.all()
        context["cars_china"] = CarsChina.objects.all()
        context["cars_korea"] = CarsKorea.objects.all()
        context["title"] = ''
        context["description"] = 'Авто из Японии, Кореи и Китая под заказ с доставкой по всей России. Популярные модели, отзывы клиентов, схема покупки и расчет стоимости доставки — всё на Ivanov Drive.'
        context["cities"] = sorted(set(item["city"] for item in delivery_list))
        context["delivery"] = delivery_list
        # Типы кузовов (уникальные)
        body_types = sorted(set(item["body_type"] for item in delivery_list))
        context["body_types"] = body_types
        # JSON-версия для фронта
        context["delivery_json"] = json.dumps(delivery_list, ensure_ascii=False)
        return context
    

class FeedbackView(View):
    def post(self, request, *args, **kwargs):
        form = FeedbackForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data["name"]
            number = form.cleaned_data["number"]
            message = form.cleaned_data["message"]

            FeedBack.objects.create(
                name=name,
                number=number,
                message=message,
            )

            return JsonResponse({
                "status": "success",
                "message": "Спасибо за отзыв!"
            }, status=200)
        else:
            return JsonResponse({
                "status": "error",
                "errors": form.errors
            }, status=400)




