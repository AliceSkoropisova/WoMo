from django.contrib import admin
from .models import ToDoList

class ToDoListInline(admin.TabularInline):
    model = ToDoList
@admin.register(ToDoList)
class ToDoListAdmin(admin.ModelAdmin):
    list_display = ('user', 'todo', 'important', 'day', 'month', 'year')