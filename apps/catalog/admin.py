from django.contrib import admin
from .models import *

@admin.register(ImageModel)
class ImageModelAdmin(admin.ModelAdmin):
    pass


@admin.register(TransmissionTypes)
class TransmissionTypesModelAdmin(admin.ModelAdmin):
    pass

@admin.register(DriveTypes)
class DriveTypesModelAdmin(admin.ModelAdmin):
    pass

@admin.register(EngineTypes)
class EngineTypesModelAdmin(admin.ModelAdmin):
    pass

@admin.register(Colors)
class ColorsModelAdmin(admin.ModelAdmin):
    pass


@admin.register(CarsJapan)
class CarsJapanAdmin(admin.ModelAdmin):
    pass

@admin.register(cities)
class CityAdmin(admin.ModelAdmin):
    pass

@admin.register(car_types)
class CarTypeAdmin(admin.ModelAdmin):
    pass

@admin.register(car_delivery_prices)
class CarDeliveryPriceAdmin(admin.ModelAdmin):
    pass