from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import ToDoList
from notes.models import Notes
from goals.models import Goals, Podgoals
from registration.models import CustomUser
from django.http import JsonResponse
import json

@login_required
def add_delo(request):
    delo = ''
    if request.POST.get('action') == 'post':
        delo = request.POST.get('delo')
        importance = request.POST.get('importance')
        checked = request.POST.get('checked')
        day = request.POST.get('day')
        month = str(int(request.POST.get('month')) + 1)
        year = request.POST.get('year')
        user_id = request.POST.get('user_id')
        print(user_id)
        user = CustomUser.objects.get(id=user_id)
        todo_instance = ToDoList.objects.create(user = user, todo = delo, important = importance, day = day, month = month, year = year, checked = checked)
        return JsonResponse('Delo is written', safe=False)
    elif request.method == 'GET' and request.GET.get('action') == 'get':
        data = ToDoList.objects.filter(user = request.GET.get('user_id'), day = request.GET.get('day'), month = str(int(request.GET.get('month')) + 1), year = request.GET.get('year'))
        dela = data.values('todo', 'important', 'checked', 'id')
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
        user = CustomUser.objects.get(id=user_id)
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
        user = CustomUser.objects.get(id=user_id)
        change = ToDoList.objects.get(user = user, todo = delo, important = importance, day = day, month = month, year = year)
        change.delete()
        return JsonResponse('Deleted', safe=False)
    elif request.method == 'POST' and request.POST.get('action') == 'change checked':
        delo = request.POST.get('delo')
        importance = request.POST.get('importance')
        day = request.POST.get('day')
        month = str(int(request.POST.get('month')) + 1)
        year = request.POST.get('year')
        user_id = request.POST.get('user_id')
        user = CustomUser.objects.get(id=user_id)
        change = ToDoList.objects.get(user=user, todo=delo, important=importance, day=day, month=month, year=year)
        if change.checked == 'false':
            change.checked = 'true'
        else:
            change.checked = 'false'
        change.save()
        print(change.checked)
        return JsonResponse('OK', safe=False)
    elif request.method == 'POST' and request.POST.get('action') == 'notes':
        user_id = request.POST.get('user_id')
        user = CustomUser.objects.get(id=user_id)
        notes = Notes.objects.filter(user = user)
        if notes.count() == 0:
            data = {
                'note': 'null'
            }
        else:
            note = notes.values('topic', 'text')
            noth = note[0]
            data = {
                'note': noth
            }
        return JsonResponse(data, safe=False)
    elif request.method == 'POST' and request.POST.get('action') == 'goal':
        user_id = request.POST.get('user_id')
        user = CustomUser.objects.get(id=user_id)
        goals = Goals.objects.filter(user = user)
        goals = goals.values('goal')
        if goals.count() == 0:
            data = {
                'name': 'null'
            }
        else:
            goal_id = Goals.objects.get(user = user, goal=goals[0]['goal'])

            kol_vsego = Podgoals.objects.filter(user = user, goal = goal_id)
            kol_vsego = kol_vsego.count()
            kol_vip = Podgoals.objects.filter(user = user, goal = goal_id, checked = 'true')
            kol_vip = kol_vip.count()
            data = {
                'name': goals[0]['goal'],
                'kol_vsego': kol_vsego,
                'kol_vip': kol_vip
            }
        return JsonResponse(data, safe=False)
    return render(request, 'index.html')
