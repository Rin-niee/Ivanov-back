import json
from typing import Any


from django.shortcuts import render
from django.views.generic import TemplateView, DetailView
from apps.catalog.models import *


class AbstractCar(DetailView):
    """View для отображения карточки авто"""

    template_name = "car_card/index.html"
    country = None
    car_link = None
    country_ = None
    model = None
    context_object_name = "car"
    pk_url_kwarg = 'id'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
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

        context["country"] = self.country
        context["car_link"] = self.car_link
        context["country_"] = self.country_
        
        

        context["engine_volume"] = int(context["car"].engine_volume) / 1000
        
        context["cities"] = sorted(set(item["city"] for item in delivery_list))
        context["delivery"] = delivery_list

        context["title"] = f"Купить {context['car'].brand} {context['car'].model} из {context['country_']} - Ivanov Drive"  
        context["description"] = f"Подробная информация о {context['car'].brand} {context['car'].model} ({context['car'].year} г.в.): Комплектация — максимальная. Стоимость — {context['car'].finish} ₽."

        # Типы кузовов (уникальные)
        body_types = sorted(set(item["body_type"] for item in delivery_list))
        context["body_types"] = body_types
        # JSON-версия для фронта
        context["delivery_json"] = json.dumps(delivery_list, ensure_ascii=False)

        return context
    

class CarJapan(AbstractCar):
    country = 'Япония'
    car_link = 'japan'
    country_ = 'Японии'
    model = CarsJapan
    

class CarChina(AbstractCar):
    country = 'Китай'
    car_link = 'china'
    country_ = 'Китая'
    model = CarsJapan


class CarKorea(AbstractCar):
    country = 'Корея'
    car_link = 'korea'
    country_ = 'Кореи'
    model = CarsJapan
