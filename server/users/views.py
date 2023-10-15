from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from users.serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .utils import *
from .tasks import *
from django.contrib.auth import get_user_model



User = get_user_model()


#generating Token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class SuperUserRegistrationView(APIView):
    def post (self,request):
        serializer = superuserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                    {'msg': 'admin registered'},
                    status = status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserRegistrationView(APIView):
    def post (self,request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            email = serializer.data['email']
            user = User.objects.filter(email=email).first()
            token = get_tokens_for_user(user)
            return Response(
                    {'token': token},
                    status = status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserLoginView(APIView):
    def post(self,request,format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                send_otp_via_email(serializer.data['email'])
                return Response(
                    {'msg': 'OTP send to your email',
                     'email':email},
                    status = status.HTTP_200_OK
                )
            else:
                return Response(
                    # {'errors': {'non_field_error': ['Email or Password is not valid']}},
                    {'errors': 'Email does not exist, please register'},
                    status = status.HTTP_400_BAD_REQUEST)
            

class VerifyOTP(APIView):
    def post(self,request):
        try:
            data = request.data
            serializer = VerifyAccountSerializer(data=data)
            if serializer.is_valid():
                email = serializer.data['email']
                otp = serializer.data['otp']
                user = User.objects.filter(email=email)

                userName = user[0].name
                userid = user[0].id

                if not user.exists():
                        return Response(
                        {
                            'data': 'invalid email',
                        },status = status.HTTP_400_BAD_REQUEST
                    )
                if not user[0].otp == otp:
                        return Response(
                        {
                            'message' : 'Somethimg went wrong',
                            'data': 'wrong otp',
                        },status = status.HTTP_400_BAD_REQUEST
                    )
                user = user.first()
                user.is_verfied = True
                user.save()
                token = get_tokens_for_user(user)
                return Response(
                            {
                                'token':token,
                                'userId': userid,
                                'userName': userName,
                                'status' : 200,
                                'data' : 'Acount Verified ',
                            }
                    )
            return Response(
                    {
                        'data': 'wrong otp',
                    },status = status.HTTP_400_BAD_REQUEST
                )
        except Exception as w:
            return Response(str(w))
