from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse

def log_in(request):
    if request.POST.get('action') == 'login':
        login = request.POST.get('login')
        password = request.POST.get('password')
        if User.filter(username = login, password = password).exists():
            redirect('')
            return JsonResponse('OK', safe=False)
        return JsonResponse('No', safe=False)
    return render(request, 'log_in.html')
# Create your views here.
