from django.shortcuts import render
from .models import ToDoList
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
def add_delo(request):
    delo = ''
    if request.POST.get('action') == 'post':
        delo = request.POST.get('delo')
        importance = request.POST.get('importance')
        day = request.POST.get('day')
        month = str(int(request.POST.get('month')) + 1)
        year = request.POST.get('year')
        user_id = request.POST.get('user_id')
        user = User.objects.get(id=user_id)
        todo_instance = ToDoList.objects.create(user = user, todo = delo, important = importance, day = day, month = month, year = year)
        return JsonResponse('Delo is written', safe=False)
    elif request.method == 'GET' and request.GET.get('action') == 'get':
        data = ToDoList.objects.filter(user = request.GET.get('user_id'), day = request.GET.get('day'), month = str(int(request.GET.get('month')) + 1), year = request.GET.get('year'))
        dela = data.values('todo', 'important')
        data = {
            'data': list(dela)
        }
        return JsonResponse(data, safe=False)
    elif request.method == 'POST' and request.POST.get('action') == 'change':
        delo = request.POST.get('delo')
        importance = request.POST.get('importance')
        day = request.POST.get('day')
        month = str(int(request.POST.get('month')) + 1)
        year = request.POST.get('year')
        user_id = request.POST.get('user_id')
        user = User.objects.get(id=user_id)
        change = ToDoList.objects.get(user = user, todo = delo, important = importance, day = day, month = month, year = year)
        if change.important == 'false':
            change.important = 'true'
        else: change.important = 'false'
        change.save()
        return JsonResponse('OK', safe=False)
    elif request.method == 'POST' and request.POST.get('action') == 'delete':
        delo = request.POST.get('delo')
        importance = request.POST.get('importance')
        day = request.POST.get('day')
        month = str(int(request.POST.get('month')) + 1)
        year = request.POST.get('year')
        user_id = request.POST.get('user_id')
        user = User.objects.get(id=user_id)
        change = ToDoList.objects.get(user = user, todo = delo, important = importance, day = day, month = month, year = year)
        change.delete()
        return JsonResponse('Deleted', safe=False)
    return render(request, 'index.html')

