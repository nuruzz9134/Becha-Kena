from rest_framework.serializers import ModelSerializer
from products.models import *
from urllib import request
from rest_framework import serializers


class ProductsSerializer(ModelSerializer):
        class Meta:
            model = Products
            fields='__all__'

        def get_main_img(self, obj):
            request = self.context.get('request')
            abs_path = request.build_absolute_uri().\
                replace(request.get_full_path(),"/media/")+\
                    str(obj.main_img)
            print("abs pathhh....",abs_path)
            return abs_path

class SingleProductsSerializer(ModelSerializer):
        # img1 = serializers.SerializerMethodField()
        # img2 = serializers.SerializerMethodField()
        # img3 = serializers.SerializerMethodField()
        class Meta:
            model = ProductImages
            fields= ['img1','img2','img3']

class AdvertisementImagesSerializer(ModelSerializer):
      class Meta:
            model = AdvertisementImages
            fields=fields= ['add1','add2','add3','add4','add5','add6']


