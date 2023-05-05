
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat_group.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OLX.settings')

application = get_asgi_application()

application = ProtocolTypeRouter({
    'http': application,
    'websocket': AuthMiddlewareStack(
                             URLRouter(
                               chat_group.routing.websocket_urlpatterns
                             )
                         )
                    })

