from rest_framework.serializers import ModelSerializer
from chat_group.models import *


class GroupSerializer(ModelSerializer):
        class Meta:
            model = Group
            fields='__all__'
