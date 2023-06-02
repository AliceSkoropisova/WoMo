from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from registration.models import CustomUser



class RegisterForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ("username", "first_name", "last_name", "avatar")