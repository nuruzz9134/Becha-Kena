
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",include('users.urls')),
    path("",include('products.urls')),
    path("",include('orders.urls')),
    path("",include('chat_group.urls')),
]
