from django.contrib import admin
from django.urls import path
from chat_group.views import *

urlpatterns = [
    path('mychats/',MyAllChatsView.as_view()),
    path('chatgroup/<str:pk>/',AllChatsDataView.as_view()),
    path('chatsortcut/<str:pk>/',ChatsSortCutView.as_view()),
    path('imageupload/',ImageUploadView.as_view()),
]
