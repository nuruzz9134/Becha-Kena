from rest_framework import serializers
from razorpay_intigrate.models import Transaction

class CreatOrderSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    currency = serializers.CharField()

class TransactionSerializer(serializers.Serializer):
    class Meta:
        model = Transaction
        fields = ["payment_id","order_id","signature","amount"]

