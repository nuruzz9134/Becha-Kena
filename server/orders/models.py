from django.db import models
from django.contrib.auth import get_user_model
from products.models import *
from datetime import datetime,timedelta


user = get_user_model()

order_status_choice = (
    ("requested","requested"),
    ("on_the_way","on_the_way"),
    ("delivered","delivered"),
)


class Order(models.Model):
    orderNumber=models.CharField(max_length=100)
    product_buyer = models.ForeignKey(user,
                            related_name='product_buyer',
                            on_delete=models.CASCADE,
                            blank=True, null=True
                           )
    product = models.ForeignKey(Products,
                            related_name='product_to_buy',
                            on_delete=models.CASCADE,
                            blank=True, null=True
                            )
    quantity = models.IntegerField() 
    order_date = models.DateField(auto_now=True)
    deliver_date = models.DateField(blank=True, null=True)
    order_status = models.CharField(max_length=15,
                                    choices=order_status_choice,
                                    default="requested")
    
    def __str__(self):
        return str(self.id)


