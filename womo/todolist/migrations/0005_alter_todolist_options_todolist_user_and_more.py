# Generated by Django 4.2 on 2023-05-07 17:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todolist', '0004_alter_todolist_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todolist',
            options={'ordering': ['user', 'year', 'month', 'day', '-important']},
        ),
        migrations.AddField(
            model_name='todolist',
            name='user',
            field=models.ForeignKey(default='12', max_length=10, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='ID_user'),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]