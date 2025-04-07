"""
URL configuration for student_mentorship_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views

router = DefaultRouter()
router.register(r'mentors', views.MentorViewSet, basename='mentors')

urlpatterns = [
    path('', include(router.urls)),
    path('chat/', views.chat, name='chat'),
    path('profile/', views.profile, name='profile'),
    path('login/', obtain_auth_token, name='api_token_auth'),
    path('register/', views.register, name='register'),

]
