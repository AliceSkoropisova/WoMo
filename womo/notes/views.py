from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Notes
from django.contrib.auth.models import User
from django.http import JsonResponse
import json

@login_required
def notes_view(request):
    if request.method == 'GET' and request.GET.get('action') == 'get':
        data = Notes.objects.filter(user=request.GET.get('user_id'))
        notes = data.values('num', 'topic', 'text')
        data = {
            'data': list(notes)
        }
        return JsonResponse(data, safe=False)
    return render(request, 'note_page.html')