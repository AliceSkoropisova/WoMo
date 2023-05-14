from django.urls import path, include
from .views import RegisterView, profile_view, logout_view

app_name = "registration"

urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')),
    path('register/', RegisterView.as_view(), name="register"),
    path('profile/', profile_view, name="profile"),
    path('logout/', logout_view, name="logout"),
]
