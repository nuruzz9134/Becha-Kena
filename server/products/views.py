from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from products.models import *
from products.serializers import *
from users.models import *




class Add_CatagoriesViews(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):
        try:
            if request.user.user_type == "admin":
                    serializer = CatagorySerializer(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response({"data":serializer.data,"msz": "Created successfully."},status = status.HTTP_201_CREATED)
                    else:
                        return Response(repr(serializer.errors),status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)




class ProductsCreateViews(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):
        try:
            if request.user.user_type == "seller":
                serializer = ProductsSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"data":serializer.data,"msz": "Created successfully."},status = status.HTTP_201_CREATED)
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
        name =request.query_params.get("name","")
        brand =request.query_params.get("brand","")
        price = request.query_params.get("price","")
        search = request.query_params.get("search","")

        filter_dict = {}
        if name :
            filter_dict['name'] = name
        if brand :
            filter_dict['brand'] = brand
        if price :
            filter_dict['price'] = price
        if search :
            data = Products.objects.filter(
                Q(
                    Q(name__icontains=search)|
                    Q(brand__icontains=search)|
                    Q(price__icontains=search))  &
                Q(**filter_dict)
                )
        else:
            data = Products.objects.filter(**filter_dict)

        products_data = []
        for i in data:
            obj = {}
            obj = {
                "Product Name":i.name,
                "Product Image": str(i.img),
                "Brand": i.brand,
                "Colour": i.colour,
                "Size": i.size,
                "Price":i.price,
                "Stocks Available":i.stocks,
                "Manufacturing Date":i.manufacture_date,
                "Warranty Time":i.warranty_months,
                "Replace Date":i.replace_day
            }
            products_data.append(obj)
        return Response({"data":products_data})




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

