from django.urls import path
from cart.views import *

urlpatterns = [
    path('allCartitem/', AllCartsToView.as_view()),
    path('addtocart/', AddToCartView.as_view()),
    path('deletefromCart/<str:pk>/', DeleteFromCartsView.as_view()),
]