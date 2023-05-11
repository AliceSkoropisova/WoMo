from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import FormView

from .form import  RegisterForm

app_name = "registration"





class RegisterView(FormView):
    form_class = RegisterForm
    template_name = 'registration/register.html'
    success_url = reverse_lazy("todolist:add_delo")
    def form_valid(self, form):
        form.save()
        return super().form_valid(form)