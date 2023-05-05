from django.contrib import admin
from users.models import User

# Register your models here.
@admin.register(User)
class UserModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in User._meta.fields
        ]