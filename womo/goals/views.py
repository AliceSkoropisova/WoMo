from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Goals, Podgoals
from django.contrib.auth.models import User
from django.http import JsonResponse
import json

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
        count = Goals.objects.count()
        goals = Goals.objects.all()
        goals = goals.values('goal')
        i = 0
        list = []
        for goal in goals:
            a = Podgoals.objects.filter(goal = goal)
            b = a.values('podgoal', 'checked')
            list.append({'goal': goal, 'podgoals_list': b})
            i+=1
        print(list)
        #data = Podgoals.objects.filter(user=request.GET.get('user_id'))
        #goals = data.values('goal', 'podgoal', 'checked')
        data = {
            'data': list
        }
        return JsonResponse(data, safe=False)
    return render(request, 'goal_page.html')



# Create your views here.
