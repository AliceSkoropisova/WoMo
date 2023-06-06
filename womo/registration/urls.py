from django.urls import path, include
from .views import RegisterView, profile_view, logout_view, rules_view

app_name = "registration"

urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls'), name="login"),
    path('register/', RegisterView.as_view(), name="register"),
    path('profile/', profile_view, name="profile"),
    path('logout/', logout_view, name="logout"),
    path('rules/', rules_view, name="rules"),
]
