from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from products.models import *
from products.serializers import *
from users.models import *



class ProductsCreateViews(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):
        try:
            if request.user.user_type == "seller":
                serializer = ProductsSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"data":serializer.data,"msz": "Created successfully."},
                                    status = status.HTTP_201_CREATED)
                else:
                    return Response(repr(serializer.errors),status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)



class ProductsQuantityUpdateViews(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request,pk):
        try:
            if request.user.user_type == "seller":
                product_id = pk
                product_numbers = request.data['add_quantity']
                stocks = Products.objects.filter(id=product_id).first().stocks
                add_stocks = int(product_numbers)
                available_stocks = int(stocks)
                present_stocks = available_stocks + add_stocks
                Products.objects.filter(id=product_id).update(stocks=present_stocks)
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)



class AllProductsViews(APIView):
    def get(self,request):
        data = Products.objects.all()
        serializer = ProductsSerializer(data,many=True,
                                        context={"request":request}
                                        )
        return Response(serializer.data)
    
class SingleProductView(APIView):
    def get(self,request,pk):
        try:
            allData =[]
            product =  Products.objects.filter(id=pk)
            product_data_serializer = ProductsSerializer(product,many=True,
                                        context={"request":request}
                                        )
            for i in product_data_serializer.data:
                a = dict(i)
                allData.append(a)
 
            img_data = ProductImages.objects.filter(productwithimages=pk)
            product_img_serializer = SingleProductsSerializer(img_data,many=True,
                                                  context={"request":request}
                                                  )
            img_links = []
            for k in product_img_serializer.data:
                for v in dict(k).values():
                   img_links.append(v)
            
            allData[0]["images"]=img_links

            return Response(allData)
        except Exception as e:
                return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)



class SellerAndProductsViews(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,pk):
        try:
            if request.user.user_type == "admin":
                products = Products.objects.filter(seller = pk)
            serializer = ProductsSerializer(products,many = True)
            return Response({"data":serializer.data})
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)


class AdvertisementImagesApiView(APIView):
    def get(self,request):
        data = AdvertisementImages.objects.all()
        serializer = AdvertisementImagesSerializer(data,many=True,
                                        context={"request":request}
                                        )
        allImg = []
        for i in serializer.data:
                for a in dict(i).values():
                   allImg.append(a)
        return Response(allImg)