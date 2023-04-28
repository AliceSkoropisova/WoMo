from django.db import models

class Notes(models.Model):
    """класс для заметки"""
    topic = models.CharField(max_length=100, blank=False)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)


class Meta:
    verbose_name = 'Заметка'
    verbose_name_plural = 'Заметки'
    ordering =['created']
def __str__(self):
    return self.topic