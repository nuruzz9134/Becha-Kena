from django.urls import path
from products.views import *

urlpatterns = [

    path('products/', AllProductsViews.as_view()),
    path('single_product/<str:pk>/', SingleProductView.as_view()),

    path('create_product/', ProductsCreateViews.as_view()),
    path('add_products_quantity/<int:pk>/', ProductsQuantityUpdateViews.as_view()),
    path('seller_all_products/<int:pk>/', SellerAndProductsViews.as_view()),


    path('addsimages/',AdvertisementImagesApiView.as_view()),
    
]