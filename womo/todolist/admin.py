from django.contrib import admin
from .models import ToDoList
#from django.contrib.auth.models import User

#class ToDoListInline(admin.TabularInline):
    #model = ToDoList


#@admin.register(User)
#class UserAdmin(admin.ModelAdmin):
    #inlines = [ToDoListInline]


@admin.register(ToDoList)
class ToDoListAdmin(admin.ModelAdmin):
    list_display = ('delo', 'importance')