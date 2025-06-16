from django.db import models

class PromoText(models.Model):
    h1 = models.CharField("Заголовок", max_length=255)
    desc = models.CharField("Текст", max_length=255)

    class Meta:
        verbose_name = "текст"
        verbose_name_plural = "Текст в первом блоке на главном экране"

    def __str__(self):
        return self.h1
