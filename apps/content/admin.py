from django.contrib import admin
from .models import *

@admin.register(PromoText)
class PromoTextAdmin(admin.ModelAdmin):
    pass

