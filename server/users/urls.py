from django.urls import path
from users.views import *
from users import views

urlpatterns = [
    path('register/', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('verify_otp/',VerifyOTP.as_view()),
]