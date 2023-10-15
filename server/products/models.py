from django.db import models
from django.contrib.auth import get_user_model

# user = get_user_model()               

catagory_choice = (
    ("phone","phone"),
    ("laptop","laptop"),
    ("tv","tv"),
    ("bike","bike"),
    ("cycle","cycle"),
    ("car","car"),
    ("refrigerator","refrigerator"),
    ("washing machine","washing machine"),
    ("books","books"),
    ("dress","dress"),
    ("home appliances","home appliances"),
    ("packaged food","packaged food"),
    ("medicine","medicine"),
    ("other","other")
    )

product_type = (
    ("new","new"),
    ("self made","self made"),
    ("seconed hand","seconed hand"),
)

class Products(models.Model):

    catagory = models.CharField(
        max_length=30,
        choices=catagory_choice
        )
    name = models.CharField(max_length=100,blank=True,null=True)
    company = models.CharField(max_length=50,blank=True,null=True)
    size = models.CharField(max_length=50,blank=True,null=True)
    price = models.IntegerField(blank=True,null=True)
    offer_Price = models.IntegerField(blank=True,null=True)
    quantity = models.IntegerField(default=1)
    product_type = models.CharField(max_length=30,
                                    blank=True,null=True,
                                    choices=product_type
                                    )
    main_img = models.ImageField(upload_to="ImagesFiles",
                                 blank=True,null=True
                                 )
    description = models.TextField(blank=True,null=True)
    manufacture_date = models.DateField(blank=True,null=True)
    warranty_months = models.IntegerField(blank=True,null=True)
    seller = models.ForeignKey(
                    get_user_model(),
                    related_name='product_seller',
                    on_delete=models.CASCADE,
                    blank=True, null=True
                    )
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
                    get_user_model(),
                    related_name='product_created_by',
                    on_delete=models.CASCADE, 
                    blank=True, null=True
                    )
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
                       get_user_model(), 
                       related_name='product_updated_by',
                       on_delete=models.CASCADE, 
                       blank=True, null=True
                       )

    def __str__(self):
        return str(self.id)

class ProductImages(models.Model):
    product = models.ForeignKey(
                      Products,
                      name='productwithimages',
                      on_delete=models.CASCADE,
                      blank=True,null=True
                      )
    img1 = models.ImageField(upload_to="ImagesFiles",blank=True,null=True)
    img2 = models.ImageField(upload_to="ImagesFiles",blank=True,null=True)
    img3 = models.ImageField(upload_to="ImagesFiles",blank=True,null=True)

    def __str__(self):
        return str(self.id)
    
class AdvertisementImages(models.Model):
    add1 = models.ImageField(upload_to="AddImages",blank=True,null=True)
    add2 = models.ImageField(upload_to="AddImages",blank=True,null=True)
    add3 = models.ImageField(upload_to="AddImages",blank=True,null=True)
    add4 = models.ImageField(upload_to="AddImages",blank=True,null=True)
    add5 = models.ImageField(upload_to="AddImages",blank=True,null=True)
    add6 = models.ImageField(upload_to="AddImages",blank=True,null=True)

