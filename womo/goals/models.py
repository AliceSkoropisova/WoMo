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


class Podcel(models.Model):
    goal = models.ForeignKey(Goals,
                             on_delete=models.CASCADE,
                             max_length=20,
                             verbose_name='Подцель')
    podgoal = models.CharField(max_length=20)
    class Meta:
        ordering = ['goal']
    def __str__(self):
        return self.podgoal
# Create your models here.
