from django.contrib import admin
from .models import Goals
from .models import Podgoals
@admin.register(Goals)
class GoalsAdmin(admin.ModelAdmin):
    list_display = ('user', 'goal')
@admin.register(Podgoals)
class PodgoalsAdmin(admin.ModelAdmin):
    list_display = ('goal', 'podgoal')
# Register your models here.
