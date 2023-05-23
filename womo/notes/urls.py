from django.urls import path
from .views import notes_view

app_name = 'notes'

urlpatterns = [
    path('notes/', notes_view, name='notes'),
]
