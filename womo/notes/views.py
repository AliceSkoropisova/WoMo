

from .models import Notes
from django.views.generic import ListView, CreateView
from django.urls import reverse_lazy



class NotesListView(ListView):
    model = Notes
    template_name = "notes.html"
    context_object_name = "notes_list"


class NotesCreateView(CreateView):
    model = Notes
    template_name = 'create_notes_form.html'
    fields = ['topic', 'text']
    success_url = reverse_lazy('noteslist')
