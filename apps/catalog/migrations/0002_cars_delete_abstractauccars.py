# Generated by Django 5.1.1 on 2025-06-15 23:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cars',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=50, verbose_name='Бренд')),
                ('model', models.CharField(max_length=50, verbose_name='Модель')),
                ('year', models.IntegerField(verbose_name='Год')),
                ('mileage', models.IntegerField(verbose_name='Пробег')),
                ('kuzov', models.CharField(max_length=50, verbose_name='Кузов')),
                ('engine_volume', models.IntegerField(verbose_name='Объем двигателя')),
                ('finish', models.CharField(max_length=50, verbose_name='Цена в валюте экспортера')),
                ('rubber', models.CharField(blank=True, choices=[('Левый руль', 'Левый руль'), ('Правый руль', 'Правый руль')], default='Левый руль', max_length=30, null=True, verbose_name='Руль')),
                ('engine', models.CharField(blank=True, default=None, max_length=250, null=True, verbose_name='Тип двигателя')),
                ('country', models.CharField(choices=[('Япония', 'Япония'), ('Китай', 'Китай'), ('Корея', 'Корея')], max_length=250, verbose_name='Страна')),
                ('color', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='catalog.colors', verbose_name='Цвет')),
                ('drive', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='catalog.drivetypes', verbose_name='Тип привода')),
                ('photos', models.ManyToManyField(blank=True, to='catalog.imagemodel', verbose_name='Фотографии авто')),
                ('transmission', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='catalog.transmissiontypes', verbose_name='Тип КПП')),
            ],
            options={
                'verbose_name': 'Автомобили',
                'verbose_name_plural': 'Автомобили',
            },
        ),
        migrations.DeleteModel(
            name='AbstractAucCars',
        ),
    ]
