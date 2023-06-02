# Generated by Django 4.2 on 2023-06-02 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(help_text='Введите Заголовок', max_length=9, verbose_name='Заголовок')),
                ('text', models.CharField(max_length=380, verbose_name='Добавьте заметку')),
                ('num', models.CharField(default='', max_length=30, verbose_name='ID')),
            ],
            options={
                'verbose_name': 'Заметка',
                'verbose_name_plural': 'Заметки',
                'ordering': ['user'],
            },
        ),
    ]
