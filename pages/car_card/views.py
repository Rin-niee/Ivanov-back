from typing import Any


from django.shortcuts import render
from django.views.generic import TemplateView, DetailView
from apps.catalog.models import CarsJapan

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

       
        context["title"] = ''
        context["country"] = self.country
        context["car_link"] = self.car_link
        context["country_"] = self.country_
        
        

        context["engine_volume"] = int(context["car"].engine_volume) / 1000
        context["description"] = ''

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
