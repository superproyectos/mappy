from user.views import UserCreateView, UserUpdateDeleteView
from django.urls import path

urlpatterns = [
    path('api/user/', UserCreateView.as_view()),
    path('api/user/<pk>/', UserUpdateDeleteView.as_view()),
]
