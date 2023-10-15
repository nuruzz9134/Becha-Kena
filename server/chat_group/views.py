from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from products.models import *
from users.models import *
from .models import *
from django.contrib.auth import get_user_model
from chat_group.serializer import *


user = get_user_model()                       

class MyAllChatsView(APIView):
    def get(self,request):
        try:
            user = request.user.id
            print("")
            userType = User.objects.get(id=user).user_type
            if userType == 'customer':
                grpName = Group.objects.filter(buyer_id=user).values('group_name')
                grpList=[]
                for i in grpName:
                    vlu =i['group_name']
                    grpList.append(vlu)
                return Response(grpList, status=HTTP_201_CREATED)
            if userType == 'seller':
                grpName = Group.objects.filter(seller_id=user).values('group_name')
                grpList=[]
                for i in grpName:
                    vlu =i['group_name']
                    grpList.append(vlu)
                return Response(grpList, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

class AllChatsDataView(APIView):
    def post(self,request,pk):
        try:
            groupStr = pk
            seller =  self.request.data.get('seller')
            buyer = request.user.id
        
            if Group.objects.filter(group_name = groupStr).exists():
                print("..existed...")
                group = Group.objects.filter(group_name = groupStr)
                groupid = group.first().id
                chats = Chats.objects.filter(group=groupid)
                imgs = Images.objects.filter(group=groupid)

                chat_serializer = ChatSerializer(chats,many=True)
                img_serializer = ImageSerializer(imgs,many=True,context={"request":request})
                
                new_arr = []
     
                for x in img_serializer.data:
                    a = dict(x)
                    new_arr.append(a)
                print()
                print()
                print()
                for x in chat_serializer.data:
                    a = dict(x)
                    new_arr.append(a)
     

                datas = (sorted(new_arr, key=lambda i: i['timestamp']))
                # print(datas)

                return Response(datas, status=HTTP_201_CREATED)

            else:
                groupname = Group(group_name = groupStr,
                                  seller_id=seller,
                                  buyer_id=buyer)
                groupname.save()
                print(".. not existed...")
                blank_datas = []
                return Response(blank_datas, status=HTTP_201_CREATED)
            
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)


class ChatsSortCutView(APIView):
    def get(self,request,pk):
        try:
            groupStr = pk
            user = request.user.id
            print("user email...",user)
            group = Group.objects.filter(group_name = groupStr)
            groupid = group.first().id
            groupseller = group.first().seller_id
            groupbuyer = group.first().buyer_id
            print("seller...",groupseller)
            print("buyer ",groupbuyer)
            if (user == groupbuyer ) or (user == groupseller) :
                print("iddd founded...")
                chats = Chats.objects.filter(group=groupid)
                imgs = Images.objects.filter(group=groupid)

                chat_serializer = ChatSerializer(chats,many=True)
                img_serializer = ImageSerializer(imgs,many=True,context={"request":request})
                
                new_arr = []
     
                for x in img_serializer.data:
                    a = dict(x)
                    new_arr.append(a)

                for x in chat_serializer.data:
                    a = dict(x)
                    new_arr.append(a)
     
                datas = (sorted(new_arr, key=lambda i: i['timestamp']))

                return Response(datas, status=HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)



class ImageUploadView(APIView):
    def post(self,request):
        groupStr = self.request.GET.get('group')
        image = request.FILES.get('image')
        user =  request.user.id
        
        try:
            groupid = Group.objects.filter(group_name = groupStr).first().id
            newImage = Images.objects.create(img=image,group_id=groupid,sender_id=user)
            savedImg_id = newImage.pk
            image = Images.objects.filter(id = savedImg_id)
            img_serializer = ImageSerializer(image,many=True,context={"request":request})
            return Response(img_serializer.data, status=HTTP_201_CREATED)
          
        except Exception as e:
            return Response({"msz": str(e)}, status=HTTP_400_BAD_REQUEST)
        
