from django.db import models
from django.contrib.auth import get_user_model
from products.models import *

user = get_user_model()  

class Cart(models.Model):
    userid = models.ForeignKey(
        user,related_name='cartuser',
        on_delete=models.CASCADE,
        blank=True,null=True
        )
    product = models.ForeignKey(
        Products,related_name='cartproduct',
        on_delete=models.CASCADE,
        blank=True,null=True
        )
    name = models.CharField(max_length=100,blank=True,null=True)
    company = models.CharField(max_length=50,blank=True,null=True)
    size = models.CharField(max_length=50,blank=True,null=True)
    price = models.IntegerField(blank=True,null=True)
    offer_Price = models.IntegerField(blank=True,null=True)
    quantity = models.IntegerField()
    main_img = models.ImageField(upload_to="CartImages",
                                 blank=True,null=True)
    isPaid = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)