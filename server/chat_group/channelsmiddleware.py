from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from urllib.parse import parse_qs

@database_sync_to_async
def get_user(user_id):
    try:
        return get_user_model().objects.get(id=user_id)
    except get_user_model().DoesNotExist:
        return AnonymousUser()

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

        query_string = scope.get("query_string", b"").decode("utf-8")
        query_params = parse_qs(query_string)
        user_id = query_params.get("userid", [None])[0]

        if user_id is not None:
            print("ussseeerrr socpe>>>",user_id)
            # You can perform additional user validation here if needed.
            scope['user'] = await get_user(int(user_id))
            # print("ussseeerrr socpe>>>",scope['user'])

        # scope['user'] = await get_user(int(scope["query_string"]))

        return await self.app(scope, receive, send)
