# Generated by Django 4.2 on 2023-05-11 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0005_alter_todolist_options_todolist_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='todolist',
            name='checked',
            field=models.CharField(default=False, max_length=5, verbose_name='Сделано'),
        ),
    ]
