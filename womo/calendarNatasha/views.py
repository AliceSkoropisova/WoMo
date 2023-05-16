from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from todolist.models import ToDoList


@login_required
def add_delo_Natasha(request):
    delo = ''
    if request.POST.get('action') == 'post':
        delo = request.POST.get('delo')
        day = request.POST.get('day')
        month = str(int(request.POST.get('month')) + 1)
        year = request.POST.get('year')
        user_id = request.POST.get('user_id')
        user = User.objects.get(id=user_id)
        todo_instance = ToDoList.objects.create(user = user, todo = delo, important = 'false', day = day, month = month, year = year, checked = 'false')
        return JsonResponse('Delo is written', safe=False)
    elif request.method == 'GET' and request.GET.get('action') == 'get_Natasha':
        data = ToDoList.objects.all()
        dela = data.values('delo', 'day', 'month', 'year')
        data = {
            'data': list(dela)
        }
        return JsonResponse(data, safe=False)
    return render(request, 'month.html')