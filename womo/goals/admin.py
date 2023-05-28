from django.contrib import admin
class GoalsInline(admin.TabularInline):
    model = Podgoals
@admin.register(Goals)
class GoalsAdmin(admin.ModelAdmin):
    list_display = ('user', 'goal', 'podgoal')
# Register your models here.
