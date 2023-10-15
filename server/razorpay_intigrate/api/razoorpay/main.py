from .import client
from rest_framework import status
from rest_framework.response import Response

class RazorpayClient:
    def create_order(self,amount,currency):
        data ={
            "amount": amount,
            "currency":currency
        }
        try:
            order_data = client.order.create(data=data)
            return order_data
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)
    
    def verify_payment(self,razorpay_orderid,razorpay_payment_id,razorpay_signature):
        try:
            return client.utility.verify_payment_signature({
                'razorpay_orderid':razorpay_orderid,
                'razorpay_payment_id':razorpay_payment_id,
                'razorpay_signature':razorpay_signature
            })
        except Exception as e:
            return Response({"msz": str(e)},status=status.HTTP_400_BAD_REQUEST)
