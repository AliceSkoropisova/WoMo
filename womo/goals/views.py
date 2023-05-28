from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Goals, Podgoals
from django.contrib.auth.models import User
from django.http import JsonResponse
import json

@login_required
def add_goal(request):
    podgoals = []
    if request.POST.get('action') == 'post':
        goal = request.POST.get('goal')
        podgoals = request.POST.get('podgoals')
        user = User.objects.get(id=user_id)
        goal_instance = Goals.objects.create(user = user, goal = goal)
        goal_real = Goals.objects.get(id=goals_id)
        i = 0
        while i < len(podgoals):
            podgoals_instance = Podgoals.objects.create(goal = goal_real, podgoal = podgoals[i])
            i+=1
        return JsonResponse('Goal is written', safe=False)
    return render(request, 'goal_page.html')



# Create your views here.
