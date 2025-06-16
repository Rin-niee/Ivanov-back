from django.contrib import admin
from .models import *

@admin.register(Social)
class SocialAdmin(admin.ModelAdmin):
    pass


@admin.register(Contacts)
class ContactsAdmin(admin.ModelAdmin):
    pass