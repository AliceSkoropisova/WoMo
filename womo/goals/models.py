from django.db import models
from django.contrib.auth.models import User

class Goals(models.Model):
    user = models.ForeignKey(User,
                           on_delete=models.CASCADE,
                           max_length=10,
                           verbose_name='ID_user',
                           default = '12')
    goal = models.CharField( max_length=20,
                             help_text="Цель",
                             verbose_name="Цель")

    class Meta:
        ordering = ['user']
    def __str__(self):
        return self.goal


class Podgoals(models.Model):
    user = models.ForeignKey(User,
                           on_delete=models.CASCADE,
                           max_length=10,
                           verbose_name='ID_user',
                           default = '4')
    goal = models.ForeignKey(Goals,
                             on_delete=models.CASCADE,
                             max_length=20,
                             verbose_name='цель')
    podgoal = models.CharField(max_length=20, verbose_name='подцель')
    checked = models.CharField(max_length = 5, verbose_name = "Сделано", default = 'false')
    class Meta:
        ordering = ['goal']
    def __str__(self):
        return self.podgoal
# Create your models here.
