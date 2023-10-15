from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from products.models import *
from cart.models import *
from users.models import *
from cart.serializers import *

class AddToCartView(APIView):
    def post(self,request):
        try:
            productId = self.request.data.get('productId')
            productName =  self.request.data.get('productName')
            productCompany = self.request.data.get('productCompany')
            productTotalPrice = self.request.data.get('productTotalPrice')
            productQuantity = self.request.data.get('productQuantity')

            main_imgs = Products.objects.filter(id=productId).first().main_img

            buyer = request.user.id
            Cart.objects.create(
                userid_id = buyer,
                product_id = productId,
                name = productName,
                company = productCompany,
                price = productTotalPrice,
                quantity = productQuantity,
                main_img = main_imgs
            )
            return Response({"msz":"Item added to your cart"})
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)
        

class DeleteFromCartsView(APIView):
     def delete(self,request,pk):
        try:
            Cart.objects.get(
                id=pk
                ).delete()
            return Response ({'msg': 'cart deleted'}, status.HTTP_204_NO_CONTENT)
        except Exception as e :
            return Response({str(e)}, status.HTTP_400_BAD_REQUEST)
        

class AllCartsToView(APIView):
        def get(self,request):
            user = request.user.id
            try:
                data = Cart.objects.filter(userid_id=user)
                serializer = CartSerializers(data,many=True,
                                                context={"request":request}
                                                )
                print(serializer.data)
                return Response(serializer.data)
            except Exception as e:
                return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)