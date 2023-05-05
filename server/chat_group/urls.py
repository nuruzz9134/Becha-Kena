from django.urls import path
from chat_group.views import *

urlpatterns = [
    path("chat/<int:pk>/",Chat_Group_Views.as_view()),
    path("all_groups/<int:pk>/",All_Group_Views.as_view()),
]
