from django.db import models
from django.contrib.auth.models import User


class Notes(models.Model):
    user = models.ForeignKey(User,
                           on_delete=models.CASCADE,
                           max_length=10,
                           verbose_name='ID_user',
                           default='12')
    topic = models.CharField(max_length=9,
                            help_text="Введите Заголовок",
                            verbose_name="Заголовок")
    text = models.CharField(max_length=380, verbose_name = "Добавьте заметку")

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
        ordering = ['user']
    def __str__(self):
        return self.topic
