# Generated by Django 4.2 on 2023-05-06 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ToDoList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('todo', models.CharField(help_text='Введите дело', max_length=40, verbose_name='Дело')),
                ('important', models.CharField(max_length=5, verbose_name='Важность')),
                ('day', models.CharField(max_length=5, verbose_name='День')),
                ('month', models.CharField(max_length=5, verbose_name='Месяц')),
                ('year', models.CharField(max_length=5, verbose_name='Год')),
            ],
            options={
                'ordering': ['year', 'month', 'day', 'important'],
            },
        ),
    ]
