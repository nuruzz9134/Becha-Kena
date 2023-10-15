

from django.db import models
from django.contrib.auth.models import AbstractUser,AbstractBaseUser,BaseUserManager


# Custom user manager...
class UserManager(BaseUserManager):

    def create_user(self, email,name, password=None,password2=None):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email),name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email,name,password,password2):
        """creates and save a new super User"""
        user = self.create_user(email=email, password=password,name=name)
        user.is_admin = True
        user.save(using=self._db)
        return user



class User(AbstractBaseUser):
    user_type_choices=(("customer","customer"),("seller","seller"))
    user_type=models.CharField(max_length=10,choices=user_type_choices,
                               blank=True,null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100,unique=True)
    otp = models.CharField(max_length=6,null=True,blank=True)
    is_verfied = models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to="profileImage",
                                      blank=True,null=True)
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
    