from rest_framework import serializers
from .models import *
from django.conf import settings
from urllib import request

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = '__all__'

    def get_cover_img(self, obj):
      request = self.context.get('request')
      abs_path = request.build_absolute_uri().\
         replace(request.get_full_path(),"/media/")+\
            str(obj.image)
      
      print("abs_path.......",abs_path)
      
      return abs_path


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chats
        fields = '__all__'