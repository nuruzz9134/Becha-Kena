from django.urls import path
from .api_razorpay import *

urlpatterns = [
    path("order/create/",CreateOrderApiView.as_view(),name="ordercreate"),
    path("order/complete/",TransactionApiView.as_view(),name="ordercomplete")
]
