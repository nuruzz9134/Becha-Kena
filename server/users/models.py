from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager


# Custom user manager...
class UserManager(BaseUserManager):

    def create_user(self, email,name,phone,user_type,address,state, password=None,password2=None):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('User must have an email')
        if user_type == "admin":
            user = self.model(email=email,name=name,phone=phone,user_type=user_type,address=address,state=state)
            user.is_admin = True
            user.set_password(password)
            user.save(using=self._db)
            return user
        
        if user_type == "customer":
            user = self.model(email=email,name=name,phone=phone,user_type=user_type,address=address,state=state)
            user.set_password(password)
            user.save(using=self._db)
            return user

        if user_type == "seller":
            user = self.model(email=email,name=name,phone=phone,user_type=user_type,address=address,state=state)
            user.set_password(password)
            user.save(using=self._db)
            return user

        else:
            raise ValueError('User must have a valid user_type')





class User(AbstractBaseUser):
    user_type_choices=(("admin","admin"),("customer","customer"),("seller","seller"))
    user_type=models.CharField(max_length=10,choices=user_type_choices)
    name = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    state = models.CharField(max_length=25, blank=True, null=True)
    phone = models.BigIntegerField(unique=True,blank=True, null=True)
    email = models.EmailField(max_length=100,unique=True)
    otp = models.CharField(max_length=6,null=True,blank=True)
    is_verfied = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    objects = UserManager()

    USERNAME_FIELD = 'email'


    def __str__(self):
        return self.email


    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self,app_label):
        return True 

    @property  
    def is_staff(self):
        "Is the user a admin member?"
        return self.is_admin