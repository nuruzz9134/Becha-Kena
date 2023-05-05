from django.contrib.auth import authenticate
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import StopConsumer
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from chat_group.models import *
import json
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser


user = get_user_model()




@database_sync_to_async
def get_user(user_id):
    try:
        return user.objects.get(id=user_id)
    except user.DoesNotExist:
        return AnonymousUser

class QueryAuthMiddleware:
    """
    Custom middleware (insecure) that takes user IDs from the query string.
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).
        scope['user'] = await get_user(int(scope["query_string"]))

        return await self.app(scope, receive, send)





class MyConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["group_name"]
        self.group_name =  self.room_name

        # Join room group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
    

        await self.accept()




    # Receive message from WebSocket
    async def receive(self, text_data):

        data = json.loads(text_data)
        msg = data['msg']

        
        group = await Group.objects.aget(group_name = self.room_name)

        if self.scope['user'].is_authenticated:
            chat = Chat(content = msg, group = group)
            await database_sync_to_async(chat.save)()

            scope_user =self.scope['user'].username
            data['user'] = scope_user

            await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "message": json.dumps(data)}
                )

        else:
            self.send({
                'text':json.dumps({"msg":"Login Required"})
            })

        

    # Receive message from room group
    async def chat_message(self, event):
        print("message from server.....",event)
        message = event["message"]
        # Send message to WebSocket
        await self.send(text_data= message)
        


async def disconnect(self, close_code):

        print("websocket dicconnected.....",close_code)
        # Leave room group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)