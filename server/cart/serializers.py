from rest_framework.serializers import ModelSerializer
from cart.models import *
from urllib import request
from rest_framework import serializers

class CartSerializers(ModelSerializer):
        class Meta:
            model = Cart
            fields='__all__'

