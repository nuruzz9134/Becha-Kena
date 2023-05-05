from django.urls import path
from orders.views import *

urlpatterns = [
    path('order_product/<int:pk>/',OrderProductsCreateViews.as_view()),
    path('all_buyer_product/<int:pk>/',OrderProductsCreateViews.as_view()),
    path('offer_email/',OfferEmailSendViews.as_view()),
]