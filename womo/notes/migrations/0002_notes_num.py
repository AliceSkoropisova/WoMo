# Generated by Django 4.2 on 2023-05-29 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notes',
            name='num',
            field=models.CharField(default='', max_length=30, verbose_name='ID'),
        ),
    ]