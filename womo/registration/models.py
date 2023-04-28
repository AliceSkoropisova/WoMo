from django.db import models

class User(models.Model):
    user_id = models.CharField(max_length = 10,
                               help_text = "Введите айди",
                               verbose_name = "ID")
    def __str__(self):
        return self.user_id
