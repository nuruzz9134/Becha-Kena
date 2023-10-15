from django.urls import path
from . import consumer




websocket_urlpatterns = [
    path('chatin/<str:group_name>/',consumer.ChateConsumer.as_asgi()),
]