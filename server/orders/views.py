from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from orders.models import *
from products.models import *
from orders.serializers import *
from users.tasks import *
from datetime import date,timedelta
from dateutil.relativedelta import relativedelta
from django_celery_beat.models import CrontabSchedule
from django_celery_beat.models import PeriodicTask
import json




def expire_warranty_date(product_id):
    months = Products.objects.filter(id=product_id).first().warranty_months

    now = date.today()
    expire_date = now + relativedelta(months=months)
    print("Expiry date  : ",expire_date)
    return expire_date


def expire_replace_date(product_id):
    days = Products.objects.filter(id=product_id).first().replace_day

    now = date.today()
    replaceday = now + timedelta(days=days)
    print("Replace date  : ",replaceday)
    return replaceday


def products_quantity_manage(product_id,product_piece):
    available = 1
    total_number_of_products = Products.objects.filter(id=product_id).first().stocks
    total_products = int(total_number_of_products)
    if total_products >= product_piece:
            available_products = total_products - product_piece
            Products.objects.filter(id = product_id).update(stocks = available_products)
            available = 1
            print("available_products :   ",available_products)
    else:
        available = 0
    
    return available




class OrderProductsCreateViews(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request,pk):

        try:
            product_id = pk
            product_piece = request.data['quantity']

            product_available = products_quantity_manage(product_id,product_piece)
            if product_available == 1:
                ex_date = expire_warranty_date(product_id)
                rep_date = expire_replace_date(product_id)
                
                email = request.user.email
                buyer = user.objects.get(email=email)
                product = Products.objects.get(id=product_id)
                order = Order.objects.create(
                    buyer = buyer,
                    product = product,
                    quantity = product_piece,
                    warranty_expire_date = ex_date,
                    replace_date = rep_date
                    )
                order_id = order.order_uniq_id
                

                orderSuccessmail(email,order_id,product_id)
                return Response({"msg":"ordered"})
            else:
                return Response({"msg":"no stocks available"})
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)




class BuyerAndProductsViews(APIView):
    def get(self,request,pk):
        try:
            products = Products.objects.filter(seller = pk)
            serializer = OrderSerializer(products,many = True)
            return Response({"data":serializer.data})
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)





class OfferEmailSendViews(APIView):
    def post(self,request):
        schedule,created = CrontabSchedule.objects.get_or_create(
            minute = 36,
            hour = 21
            )
        task = PeriodicTask.objects.create(
            crontab = schedule,
            name ="nuw_year_offer-"+"1",
            task ="users.tasks.orderSuccessmail",
           # args = json.dumps((2,3))
            )
        return Response({"data":"send"})