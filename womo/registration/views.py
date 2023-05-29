from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import FormView
from django.contrib.auth import logout
from .form import RegisterForm
app_name = "registration"


def logout_view(request):
    logout(request)
    return redirect('registration:login')


@login_required
def profile_view(request):
    return render(request, "profile/profile.html")


class RegisterView(FormView):
    form_class = RegisterForm
    template_name = 'registration/register.html'
    success_url = reverse_lazy("todolist:add_delo")

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)