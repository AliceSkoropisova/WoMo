from django.db import models
from django.contrib.auth.models import User
class Notes(models.Model):
    """класс для заметки"""
    user = models.ForeignKey(User,
                             default = '0',
                             on_delete=models.CASCADE)
    topic = models.CharField(max_length=100, blank=False)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)


class Meta:
    verbose_name = 'Заметка'
    verbose_name_plural = 'Заметки'
    ordering =['created']
def __str__(self):
    return self.topic