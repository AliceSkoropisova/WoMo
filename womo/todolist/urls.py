from django.urls import path, include
from .views import add_delo

app_name = "todolist"

urlpatterns = [
    path('', add_delo, name='add_delo'),
]