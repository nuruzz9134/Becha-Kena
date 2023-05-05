from .models import User
from products.models import *
from django.core.mail import send_mail,EmailMessage
from django.conf import settings
import threading
import random

