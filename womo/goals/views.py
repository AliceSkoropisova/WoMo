from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Goals, Podgoals
from django.contrib.auth.models import User
from registration.models import CustomUser
from django.http import JsonResponse
import json
from django.forms import model_to_dict

@login_required
def add_goal(request):
    if request.POST.get('action') == 'post':
        title = request.POST.get('title')
        podgoals = json.loads(request.POST.get('podgoals'))
        user_id = request.POST.get('user_id')
        user = CustomUser.objects.get(id=user_id)
        goal = Goals.objects.create(user = user, goal = title)
        i = 0
        stro = 'f'
        while i < len(podgoals):

            if podgoals[i]['checked'] == False:
                stro = 'false'
            else:
                stro = 'true'
            podgoals_instance = Podgoals.objects.create(user = user, goal = goal, podgoal = podgoals[i]['goals_todo'], checked = stro, index = str(i))
            i+=1
        return JsonResponse('Goal is written', safe=False)
    elif request.GET.get('action') == 'get':
        user_id = request.GET.get('user_id')
        user = CustomUser.objects.get(id=user_id)
        goals = Goals.objects.filter(user = user)
        goals = goals.values('goal', 'id')
        podgoals = Podgoals.objects.filter(user = user)
        podgoals = podgoals.values('goal', 'podgoal', 'checked')
        data = {
            'goals': list(goals),
            'podgoals': list(podgoals)
        }
        return JsonResponse(data, safe=False)
    elif request.POST.get('action') == 'change':
        title = request.POST.get('title')
        podgoals = request.POST.get('podgoals')
        index = request.POST.get('index')
        goal = Goals.objects.get(goal = title)
        user_id = request.POST.get('user_id')
        user = CustomUser.objects.get(id=user_id)
        change = Podgoals.objects.get(user=user, goal = goal, podgoal = podgoals, index = index)
        if change.checked == 'false':
            print("fuck)")
            change.checked = 'true'
        else:
            change.checked = 'false'
        change.save()
        return JsonResponse('Goal is written', safe=False)
    elif request.method == 'POST' and request.POST.get('action') == 'delete':
        user_id = request.POST.get('user_id')
        user = CustomUser.objects.get(id=user_id)
        header = request.POST.get('header')
        change = Goals.objects.get(user = user, goal = header)
        change.delete()
        return JsonResponse('Deleted', safe=False)
    return render(request, 'goal_page.html')



# Create your views here.
