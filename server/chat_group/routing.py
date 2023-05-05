from django.urls import path
from . import consumer




websocket_urlpatterns = [
    path('chat/<str:group_name>/',consumer.MyConsumer.as_asgi()),

]