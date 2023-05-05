from rest_framework.serializers import ModelSerializer
from products.models import *


class CatagorySerializer(ModelSerializer):
        class Meta:
            model = Catagory
            fields='__all__'


class ProductsSerializer(ModelSerializer):
        class Meta:
            model = Products
            fields='__all__'


