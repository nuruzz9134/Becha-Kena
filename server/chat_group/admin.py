from django.contrib import admin
from chat_group.models import *

# Register your models here.
@admin.register(Group)
class GroupModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Group._meta.fields
        ]


@admin.register(Chats)
class ChatModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Chats._meta.fields
        ]
    
@admin.register(Images)
class ImagesModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Images._meta.fields
        ]