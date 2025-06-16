from django.contrib import admin
from .models import FeedBack


@admin.register(FeedBack)
class FeedBackAdmin(admin.ModelAdmin):
    pass
