from django.db import models

class Social(models.Model):
    name = models.CharField(max_length=255, verbose_name='наименование')
    url = models.CharField(max_length=255, verbose_name='ссылка')
    # view = models.BooleanField(default=True, verbose_name='Отображать?')

    class Meta:
        verbose_name = "Социальные сети"
        verbose_name_plural = "Социальные сети"

    def __str__(self):
        return self.name
    

class Contacts(models.Model):
    adress = models.CharField(max_length=255, verbose_name='адрес')
    time = models.CharField(max_length=255, verbose_name='время работы')
    number = models.CharField(max_length=255, verbose_name='Номер горячей линии')
    inn = models.CharField(max_length=255, verbose_name='ИНН')
    ogrn = models.CharField(max_length=255, verbose_name='ОГРНИП')
    ip = models.CharField(max_length=255, verbose_name='Юр. наименование')

    class Meta:
        verbose_name = "данные"
        verbose_name_plural = "Контактные данные"

    def __str__(self):
        return self.ip
