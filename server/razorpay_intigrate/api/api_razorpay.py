from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .razorpay_serializer import *
from razorpay_intigrate.api.razoorpay.main import RazorpayClient

rz_client = RazorpayClient()

class CreateOrderApiView(APIView):
    def post(self,request):
        create_order_serializer = CreatOrderSerializer(
            data=request.data
        )
        if create_order_serializer.is_valid():
            order_responce = rz_client.create_order(
                amount=create_order_serializer.validated_data.get("amount"),
                currency=create_order_serializer.validated_data.get("currency")
            )
            return Response({"data":order_responce,"msz": "Order Created successfully."},
                            status = status.HTTP_201_CREATED)
        else:
            return Response(repr(create_order_serializer.errors),
                            status=status.HTTP_400_BAD_REQUEST)
        

class TransactionApiView(APIView):
    def post(self,request):
        transaction_serializer = TransactionSerializer(
            data=request.data
        )
        if transaction_serializer.is_valid():
            rz_client.verify_payment(
                razorpay_orderid=transaction_serializer.validated_data.get("order_id"),
                razorpay_payment_id= transaction_serializer.validated_data.get("payment_id"),
                razorpay_signature=transaction_serializer.validated_data.get("signature"),
            )
            # transaction_serializer.save()
            orderedId = transaction_serializer.validated_data.get("order_id")
            return Response({"msz": "Transaction successfully.","orderedId":orderedId},
                            status = status.HTTP_201_CREATED)
        else:
            return Response(repr(transaction_serializer.errors),
                            status=status.HTTP_400_BAD_REQUEST)