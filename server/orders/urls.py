from django.urls import path
from orders.views import *

urlpatterns = [
    path('buyproduct/<str:pk>/', ProductsBuyAndUpdateView.as_view())
]