from celery import shared_task
from django.core.mail import send_mail
from OLX import settings
import random
from .models import User
from products.models import *


@shared_task(bind=True)
def registrationEmailMessage(self,email):
    subject = "registration done"
    message = "Thank You for join with OLX. You have registered successfully"
    email_from = settings.EMAIL_HOST
    send_mail(subject,message,email_from,[email])
    return "email send successfull"


@shared_task(bind=True)
def send_otp_via_email(self,email):
        subject = 'verification OTP'
        otp = random.randint(1000 , 9999)
        message = f'Your OTP number is :   {otp}'
        email_from = settings.EMAIL_HOST
        send_mail(subject , message , email_from , [email])
        user_obj = User.objects.get(email=email)
        user_obj.otp =otp
        user_obj.save()
        return "email send successfull"



@shared_task(bind=True)
def orderSuccessmail(self,email,order_id,product):
    name = User.objects.filter(email=email).first().name
    product_name = Products.objects.filter(id=product).first().name
    subject = f"Order id : {order_id}"
    message = f"Hello Mr.{name}, Your order id is {order_id} , your {product_name} will be delivered soon."
    email_from = settings.EMAIL_HOST
    send_mail(subject,message,email_from,[email])
    return "email send successfull"



@shared_task(bind=True)
def orderSuccessmail(self):
    print("TASK START :::::::::::::")
    users = User.objects.all()
    for user in users:
        to_mail = user.email
        subject = "Bumper Sell"
        message = "New Year Bumper Sell"
        email_from = settings.EMAIL_HOST
        print("MAIL READY :::::::::::::")
        send_mail(
            subject = subject,
            message = message,
            from_email=email_from,
            recipient_list= [to_mail],
            fail_silently= True
             )
    return "email send successfull"



