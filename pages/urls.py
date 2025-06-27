from django.urls import path

from pages.home.views import FeedbackView, HomeView
from pages.car_card.views import CarJapan, CarChina, CarKorea

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path('feedback/', FeedbackView.as_view(),name='feedback'),
    
    path('japan/<str:model>_<str:brand>_<int:year>_<int:id>', CarJapan.as_view(),name='car_japan'),
    path('china/<str:model>_<str:brand>_<int:year>_<int:id>', CarChina.as_view(),name='car_china'),
    path('korea/<str:model>_<str:brand>_<int:year>_<int:id>', CarKorea.as_view(),name='car_korea'),
    # path("feedback/", feedback_view, name="feedback"),
]

