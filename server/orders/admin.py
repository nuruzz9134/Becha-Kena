from django.contrib import admin
from orders.models import *

# Register your models here.
@admin.register(Order)
class ProductsModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Order._meta.fields
        ]