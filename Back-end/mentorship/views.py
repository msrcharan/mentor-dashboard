from django.contrib.auth import get_user_model  # Optional: Use this for dynamic reference
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import User  # Import custom User model
from .serializers import UserSerializer, MessageSerializer


# Use this instead of hardcoding User if preferred
# User = get_user_model()
User = get_user_model()

class MentorViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role='mentor')  # Use custom User
    serializer_class = UserSerializer
    permission_classes = ['rest_framework.permissions.IsAuthenticated']

@api_view(['POST'])
def chat(request):
    message = request.data.get('message')
    reply = "Echo: " + message
    Message.objects.create(user=request.user, text=message, response=reply)
    return Response({'reply': reply})

@api_view(['GET'])
def profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    print('Request Origin:', request.headers.get('Origin'))
    print('Request Data:', request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    role = request.data.get('role', 'student')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.role = role
    user.save()

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username': user.username, 'role': user.role})