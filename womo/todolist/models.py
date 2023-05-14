from django.db import models
from django.contrib.auth.models import User

class ToDoList(models.Model):
    user = models.ForeignKey(User,
                           on_delete=models.CASCADE,
                           max_length=10,
                           verbose_name='ID_user',
                           default = '12')
    todo = models.CharField(max_length = 40,
                            help_text = "Введите дело",
                            verbose_name = "Дело")
    checked = models.CharField(max_length = 5, verbose_name = "Сделано", default = 'false')
    important = models.CharField(max_length = 5, verbose_name = "Важность")
    day = models.CharField(max_length = 5, verbose_name = "День")
    month= models.CharField(max_length = 5, verbose_name = "Месяц")
    year = models.CharField(max_length = 5, verbose_name = "Год")
    class Meta:
        ordering = ['user', 'year', 'month', 'day', '-important']
    def __str__(self):
        return self.todo
