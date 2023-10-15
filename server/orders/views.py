from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from orders.models import *
from products.models import *
from orders.serializers import *
from users.tasks import *




class ProductsBuyAndUpdateView(APIView):
    def put(self,request,pk):
        try:
            productId = pk
            quantity =  self.request.data.get('product_quantity')
            orderedId = self.request.data.get('orderedId')
            buyer = request.user.id
            email = request.user.email

            product_total_quantity = Products.objects.get(id=productId).quantity
            newQuantity = int(product_total_quantity) - int(quantity)
            Products.objects.filter(id=productId).update(quantity=newQuantity)

            order = Order.objects.update_or_create(
                orderNumber=orderedId,
                product_buyer_id = buyer,
                product_id = productId,
                quantity = quantity
                    )
            order_id = order.order_uniq_id
            
            orderSuccessmail(email,order_id,productId)
            return Response({"msg":"ordered"})
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)
