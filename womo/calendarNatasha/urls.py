from django.urls import path

from calendarNatasha.views import add_delo_Natasha

app_name = 'calendar'

urlpatterns = [
    path('calendar/', add_delo_Natasha('month.html'), name='add_delo_Natasha_month'),
    path('calendar/week/', add_delo_Natasha('try.html'), name='add_delo_Natasha_week')
]
