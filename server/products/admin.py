from django.contrib import admin
from products.models import *

# Register your models here.

    
@admin.register(Products)
class ProductsModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Products._meta.fields
        ]
    
@admin.register(ProductImages)
class ProductImagesModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in ProductImages._meta.fields
        ]

@admin.register(AdvertisementImages)
class AdvertisementImagesModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in AdvertisementImages._meta.fields
        ]