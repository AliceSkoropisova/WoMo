from django.contrib import admin
from .models import ToDoList
from registration.models import User

class ToDoListInline(admin.TabularInline):
    model = ToDoList


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    inlines = [ToDoListInline]


@admin.register(ToDoList)
class ToDoListAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'delo', 'importance')