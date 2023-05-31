from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Goals, Podgoals
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.forms import model_to_dict

@login_required
def add_goal(request):
    if request.POST.get('action') == 'post':
        title = request.POST.get('title')
        podgoals = json.loads(request.POST.get('podgoals'))
        user_id = request.POST.get('user_id')
        user = User.objects.get(id=user_id)
        goal = Goals.objects.create(user = user, goal = title)
        i = 0
        while i < len(podgoals):
            podgoals_instance = Podgoals.objects.create(goal = goal, podgoal = podgoals[i]['goals_todo'], checked = podgoals[i]['checked'])
            i+=1
        return JsonResponse('Goal is written', safe=False)
    elif request.GET.get('action') == 'get':
        user_id = request.GET.get('user_id')
        user = User.objects.get(id=user_id)
        goals = Goals.objects.filter(user = user)
        #goals = goals.values('goal')
        for g in goals:
            a = Podgoals.objects.filter(goal=g)
            #b = a.values('podgoal', 'checked')
            print(b)
        #a = Podgoals.objects.filter(user=user)
        #b = a.values('goal', 'podgoal', 'checked')
        data = {
            'goals': list(goals),
            #'podgoals': list(b)
        }
        return JsonResponse(data, safe=False)
    return render(request, 'goal_page.html')



# Create your views here.
