from django.db import models

class User(models.Model):
    user_id = models.CharField(max_length = 10,
                               help_text = "Введите айди",
                               verbose_name = "ID")
    def __str__(self):
        return self.user_id


class ToDoList(models.Model):
    user_id = models.ForeignKey('User',
                                  on_delete = models.CASCADE,
                                  help_text = "Введите id",
                                  verbose_name = "ID")
    delo = models.CharField(max_length = 40,
                            help_text = "Введите дело",
                            verbose_name = "Дело")
    Imp = "I"
    Mid = "M"
    Not_imp = "N"
    Choices_Importance = [(Imp, "Важно"), (Mid, "Средне"), (Not_imp, "Не важно")]
    importance = models.CharField(max_length = 8,
                                  choices = Choices_Importance,
                                  default = Imp)
    class Meta:
        ordering = ["user_id", "importance"]
    def __str__(self):
        return self.delo