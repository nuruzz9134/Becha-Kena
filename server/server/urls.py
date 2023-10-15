
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("user/",include('users.urls')),
    path("",include('products.urls')),
    path("",include('orders.urls')),
    path("",include('chat_group.urls')),
    path("",include('cart.urls')),
    path("razorpay/",include('razorpay_intigrate.api.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
