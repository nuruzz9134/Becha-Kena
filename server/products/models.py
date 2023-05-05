from django.db import models
from django.contrib.auth import get_user_model



user = get_user_model()               


catagory_choice = (
    ("electronics","electronics"),
    ("men fashion","men fashion"),
    ("women fashion","women fashion"),
    ("kids fashion","kids fashion"),
    ("grocery","grocery"),
    ("toy","toy"),
    ("vehicals","vehicals"),
    ("appliances","appliances")
    )

class Catagory(models.Model):
    catagory = models.CharField(max_length=15,choices=catagory_choice)
    sub_catagory = models.CharField(max_length=25,blank=True,null=True)


class Products(models.Model):
    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=True,null=True)
    type = models.ForeignKey(Catagory,related_name='product_catagory',
        on_delete=models.CASCADE,blank=True,null=True)
    img = models.ImageField(upload_to="ImagesFiles")
    brand = models.CharField(max_length=50,blank=True,null=True)
    colour = models.CharField(max_length=50,blank=True,null=True)
    size = models.CharField(max_length=50,blank=True,null=True)
    price = models.CharField(max_length=50,blank=True,null=True)
    stocks = models.CharField(max_length=50,default=1)
    manufacture_date = models.DateField(blank=True,null=True)
    warranty_months = models.IntegerField(blank=True,null=True) 
    replace_day = models.IntegerField(blank=True,null=True)     
    seller = models.ForeignKey(user,related_name='product_seller',
        on_delete=models.CASCADE,blank=True, null=True)
    
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
            user, related_name='product_created_by',
            on_delete=models.CASCADE, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
            user, related_name='product_updated_by',
            on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.id)


# class Seller(models.Model):
#     marchant = models.OneToOneField(user,related_name='customer',
#         on_delete=models.CASCADE,blank=True, null=True
#         )
#     Products = models.ForeignKey(Products,related_name='products',
#         on_delete=models.CASCADE,blank=True, null=True
#         )