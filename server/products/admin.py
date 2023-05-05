from django.contrib import admin
from products.models import *

# Register your models here.

@admin.register(Catagory)
class CatagoryModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Catagory._meta.fields
        ]



@admin.register(Products)
class ProductsModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Products._meta.fields
        ]