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


class Chats(models.Model):
    sender = models.ForeignKey(user,related_name='chat_sender',
        on_delete=models.CASCADE,blank=True,null=True)
    content = models.TextField(blank=True,null=True)
    timestamp = models.DateTimeField(auto_now=True)
    group = models.ForeignKey('Group',
          on_delete=models.CASCADE,blank=True,null=True)
    

class Images(models.Model):
    sender = models.ForeignKey(user,related_name='img_sender',
        on_delete=models.CASCADE,blank=True,null=True)
    img = models.ImageField(upload_to='chatsimagestore', default=None)
    timestamp = models.DateTimeField(auto_now=True)
    group = models.ForeignKey('Group',on_delete=models.CASCADE
                              ,blank=True,null=True)