# Generated by Django 5.1.1 on 2025-06-15 23:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='social',
            name='view',
        ),
    ]
