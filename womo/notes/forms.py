from django import forms
from .models import Notes


class NotesForm(forms.ModelForm):

    model = Notes
    fields = ('topic', 'text', 'created')