
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
import json
from .models import *
from users.models import *
from channels.db import database_sync_to_async



class ChateConsumer(AsyncWebsocketConsumer):
    connected_users = set()

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["group_name"]
        self.room_group_name = "user_%s" % self.room_name

        # print("channel name...",self.channel_name)

        if self.channel_name in self.connected_users:
            # User is already connected, handle as needed (e.g., reject the connection).
            await self.close()
        else:
            # Add the user to the room's group and the list of connected users
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            channel_name = self.channel_name
            existed_item = list(self.connected_users)
            if existed_item:
                # Notify existing users about the new user's presence
                await self.channel_layer.send(
                        existed_item[0],
                        {
                            'type': 'user.join',
                            'username': self.scope['user'].name,
                            'channelName':channel_name
                        }
                    )
                self.connected_users.add(channel_name)
            else:
                self.connected_users.add(channel_name)
     
        await self.accept()
        print("websocket connected........")


    async def disconnect(self, close_code):

        print("websocket dicconnected.....",close_code)
        # Leave room group
        await self.channel_layer.group_discard(
             self.room_group_name,
             self.channel_name)
        self.connected_users.remove(self.channel_name)


    # Receive message from WebSocket
    async def receive(self, text_data):

        data = json.loads(text_data)

        if data['type'] == 'call':
             callSendto = data['to']
             await self.channel_layer.send(
             callSendto, {
                  "type": "chat.call",
                  "offer": data['offer'],
                  "from": self.channel_name}
                )
             
        if data['type'] == 'callAccepted':
             callSendto = data['to']
             await self.channel_layer.send(
             callSendto, {
                  "type": "call.accepted",
                  "answer": data['answer'],
                  "from": data['to'] }
                )
             
        if data['type'] == 'nego_needed':
            # print("offer nego..",data['offer'])
            callSendto = data['to']
            await self.channel_layer.send(
             callSendto, {
                  "type": "nagotiation.call",
                  "offer": data['offer'],
                  "from": self.channel_name}
                )
             
        if data['type'] == 'nego_done':
             callSendto = data['to']
             await self.channel_layer.send(
             callSendto, {
                  "type": "nagotiation.done",
                  "answer": data['answer'],
                #   "from": self.channel_name 
                  }
                )
        
        if data['type'] == 'photo':
            await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.image", "message": json.dumps(data)}
                )
            
        if data['type'] == 'texts':
            text = data['text']
            user = data['user']
            group = await Group.objects.aget(group_name = self.room_name)
            message = Chats(content = text, group = group,sender_id=user)
            await database_sync_to_async(message.save)()

            await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.texts", "message": json.dumps(data)}
                )



    async def chat_call(self, event):
            await self.send(text_data= json.dumps({
                 'type':'incomming_call',
                 'offer': event["offer"],
                 'from': event["from"]
            }))

    async def call_accepted(self, event):
            await self.send(text_data= json.dumps({
                 'type':'accepted_call',
                 'answer': event["answer"],
                 'from': event["from"]
            }))
    
    async def nagotiation_call(self, event):
            await self.send(text_data= json.dumps({
                 'type':'incomming_nagotiation',
                 'offer': event["offer"],
                 'from': event["from"]
            }))

    async def nagotiation_done(self, event):
            await self.send(text_data= json.dumps({
                 'type':'nagotiation_final',
                 'answer': event["answer"],
                #  'from': event["from"]
            }))



    async def chat_image(self, event):
            message = event["message"]
            await self.send(text_data= message)

    async def chat_texts(self, event):
            message = event["message"]
            await self.send(text_data= message)

    async def user_join(self, event):
            username = event['username']
            message = f"{username} has joined the room."

            # Send the notification message to the WebSocket
            await self.send(text_data=json.dumps({
                 'type':'user_join',
                'message': message,
                'channelName': event['channelName']
            }))