from django.db import models
from django.contrib.auth import get_user_model


user = get_user_model()



# Create your models here.
class Group(models.Model):
    group_name = models.CharField(max_length=100)
    seller = models.ForeignKey(user,related_name='chat_seller',
        on_delete=models.CASCADE,blank=True,null=True)
    buyer = models.ForeignKey(user,related_name='chat_buyer',
        on_delete=models.CASCADE,blank=True,null=True)



class Chat(models.Model):
    content = models.TextField(blank=True,null=True)
    group = models.ForeignKey('Group',
          on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)
    
    