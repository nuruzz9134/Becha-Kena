from django.urls import path
from users.views import *

urlpatterns = [
    path('admin/', SuperUserRegistrationView.as_view()),
    path('register/', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('verify_otp/',VerifyOTP.as_view()),
]