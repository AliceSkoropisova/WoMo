from django.urls import path
from .views import add_goal

app_name = 'goals'

urlpatterns = [
    path('goals/', add_goal, name='goals'),
]
