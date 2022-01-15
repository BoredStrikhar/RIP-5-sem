from django.contrib import admin
from .models import Manufacturer, Product

admin.site.register(Product)
admin.site.register(Manufacturer)