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
    elif request.POST.get('action') == 'post':
        user_id = request.POST.get('user_id')
        user = User.objects.get(id=user_id)
        num = request.POST.get('item')
        topic = request.POST.get('topic')
        text = request.POST.get('text')
        if Notes.objects.filter(user=user, num=num).exists():
            change = Notes.objects.get(user=user,  num=num)
            change.topic = topic
            change.text = text
            change.save()
        else:
            notes_instance = Notes.objects.create(user=user, num=num, topic=topic, text=text)
        return JsonResponse("Кайф!", safe=False)
    elif request.POST.get('action') == 'delite':
        user_id = request.POST.get('user_id')
        user = User.objects.get(id=user_id)
        num = request.POST.get('item')
        change = Notes.objects.get(user=user,  num=num)
        change.delete()
        return JsonResponse("Кайф!", safe=False)
    return render(request, 'note_page.html')