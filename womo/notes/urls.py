from django.urls import path
from . import views

app_name = 'notes'

urlpatterns = [
    path('notes/list', views.NotesListView.as_view(), name="noteslist"),
    path('notes/notescreate', views.NotesCreateView.as_view(), name="createnotes"),
]
