from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from products.models import *
from users.models import *
from .models import Chat,Group
from django.contrib.auth import get_user_model
from chat_group.serializer import *


user = get_user_model()                       


class Chat_Group_Views(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request,pk):
        buyer_id = request.user.id
        seller_id = pk
        print("buyer_id : ",buyer_id)
        buyer = user.objects.get(id=buyer_id).name
        seller = user.objects.get(id=seller_id).name

        b = user.objects.get(id=buyer_id)
        s = user.objects.get(id=seller_id)

    
        group_name = f"chat_{str(buyer )+ str(seller)}"
        print("Group name :  ",group_name)

        chats = []
        group = Group.objects.filter(group_name = group_name).first()

        
        if group:
            chats = Chat.objects.filter(group=group)

        else:
            Group.objects.create(group_name = group_name,buyer=b,seller=s)


        return render(request,'index.html',
        {'groupname':group_name, 'chats':chats})





class All_Group_Views(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,pk):
        try:
            if request.user.user_type == "customer":
                if Group.objects.filter(buyer = pk).exists():
                    data = Group.objects.filter(buyer = pk)
                    list=[]
                    for i in data:
                        obj={}
                        obj={
                        i.group_name
                        }
                        list.append(obj)
            
            if request.user.user_type == "seller":
                if Group.objects.filter(seller = pk).exists():
                    data = Group.objects.filter(buyer = pk)
                    list=[]
                    for i in data:
                        obj={}
                        obj={
                        i.group_name
                        }
                        list.append(obj)

            return Response({"msg":list})
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)