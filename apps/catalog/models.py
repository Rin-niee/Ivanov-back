import uuid
from PIL import Image
from io import BytesIO

from django.db import models
from django.core.files.uploadedfile import InMemoryUploadedFile



class ImageModel(models.Model):
    """Модель для изображений"""
    image = models.ImageField(upload_to="images/%Y/%m/%d/", verbose_name="изображение",
                            help_text="все форматы(кроме svg) конвертируются в webp",)

    def save(self, *args, **kwargs):
        name = str(uuid.uuid1())
        img = Image.open(self.image)
        img_io = BytesIO()
        img.save(img_io, format="WebP")
        img_file = InMemoryUploadedFile(
            img_io, None, f"{name}.webp", "image/webp", img_io.tell(), None
        )
        self.image.save(f"{name}.webp", img_file, save=False)

        super(ImageModel, self).save(*args, **kwargs)

    class Meta:
        verbose_name = ("фото")
        verbose_name_plural = ("фото")

    def __str__(self):
        return f"{self.image}"


class TransmissionTypes(models.Model):
    name = models.CharField(verbose_name="Наименование", max_length=50)

    class Meta:
        verbose_name = "тип"
        verbose_name_plural = "Типы КПП"

    def __str__(self):
        return self.name


class DriveTypes(models.Model):
    name = models.CharField(verbose_name="Наименование", max_length=50)

    class Meta:
        verbose_name = "тип"
        verbose_name_plural = "Типы привода"

    def __str__(self):
        return self.name


class EngineTypes(models.Model):
    name = models.CharField(verbose_name="Наименование", max_length=50)

    class Meta:
        verbose_name = "тип"
        verbose_name_plural = "Типы двигателя"

    def __str__(self):
        return self.name


class Colors(models.Model):
    name = models.CharField(verbose_name="Наименование", max_length=50)

    class Meta:
        verbose_name = "цвет"
        verbose_name_plural = "Цвета авто"

    def __str__(self):
        return self.name


RUBBER_CHOICES = (
    ('Левый руль', "Левый руль"),
    ('Правый руль', "Правый руль"),
)

COUNTRY_CHOICES = (
    ('Япония', "Япония"),
    ('Китай', "Китай"),
    ('Корея', "Корея"),
)


class AbstractCars(models.Model):
    brand = models.CharField(verbose_name="Бренд", max_length=50)
    model = models.CharField(verbose_name="Модель", max_length=50)
    year = models.IntegerField(verbose_name="Год")
    mileage = models.IntegerField(verbose_name="Пробег")
    transmission  = models.ForeignKey(TransmissionTypes, verbose_name="Тип КПП", on_delete=models.SET_NULL, null=True)
    kuzov = models.CharField(verbose_name="Кузов", max_length=50)
    engine_volume = models.IntegerField(verbose_name="Объем двигателя")
    drive = models.ForeignKey(DriveTypes, verbose_name="Тип привода", on_delete=models.SET_NULL, null=True)
    color = models.ForeignKey(Colors,verbose_name="Цвет", on_delete=models.SET_NULL, null=True)
    finish = models.CharField(verbose_name="Цена в валюте экспортера", max_length=50)
    rubber = models.CharField(verbose_name="Руль", max_length=30,null=True, blank=True, choices=RUBBER_CHOICES, default='Левый руль')
    engine = models.ForeignKey(EngineTypes, verbose_name="Тип двигателя", on_delete=models.PROTECT)
    country = models.CharField(verbose_name="Страна", max_length=250, choices=COUNTRY_CHOICES)
    photos = models.ManyToManyField(ImageModel, verbose_name='Фотографии авто', blank=True)

    def __str__(self):
        return f"{self.brand} {self.model} {self.year}"
    
    class Meta:
        abstract = True

class CarsJapan(AbstractCars):    
    class Meta:
        verbose_name = "Автомобили"
        verbose_name_plural = "Автомобили Япония"


class cities(models.Model): 
    city_name = models.CharField(verbose_name="Название города", max_length=255)
    distance_from_vladivostok = models.IntegerField(verbose_name="Расстояние от Владивостока, км")
    delivery_time_days  = models.IntegerField(verbose_name="Время в пути, ДО, в сутках")

class car_types(models.Model):
    BODY_TYPE_CHOICES = [
        ('sedan', 'Седан'),
        ('crossover', 'Кроссовер'),
        ('jeep', 'Джип'),
        ('minibus', 'Микроавтобус'),
        ('truck', 'Грузовик'),
    ]

    car_types_name  =  models.CharField(max_length=100)
    body_type = models.CharField(
        max_length=20,
        choices=BODY_TYPE_CHOICES,
        default='sedan'
    )

class car_delivery_prices (models.Model):
    city_id  = models.ForeignKey(cities, verbose_name="Город", on_delete=models.SET_NULL, null=True)
    car_type_id = models.ForeignKey(car_types, verbose_name="Город", on_delete=models.SET_NULL, null=True)
    price = models.IntegerField(verbose_name="Цена")



class TelegramUser(models.Model):
    user_id = models.CharField(max_length=64, unique=True)
    username = models.CharField(max_length=64, blank=True, null=True)

    def __str__(self):
        return self.username or self.user_id
