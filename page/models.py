from django.db import models
from colorfield.fields import ColorField

class Banner(models.Model):
    order = models.IntegerField('Порядок отображения', default=1)
    image = models.ImageField('Картинка', upload_to='banners/', blank=False)
    url = models.CharField('Ссылка на кнопке', max_length=255, blank=False)
    buttonColor = ColorField('Цвет кнопки', default='#000000')
    buttonTextColor = ColorField('Цвет текста кнопки', default='#000000')
    bigText = models.CharField('Заголовок', max_length=255, blank=False, default='')
    bigTextColor = ColorField('Цвет текста заголовка',default='#000000')
    smallText = models.CharField('Описание', max_length=255, blank=True)
    smallTextColor = ColorField('Цвет текста описания', default='#000000')
    badgeText = models.CharField('Текст в бейдже', max_length=255, blank=True)
    badgeTextColor = ColorField('Цвет текста в бейдже', default='#000000')
    badgeColor = ColorField('Цвет бейджа', default='#000000')
    positionLeft = models.BooleanField('Текст слева?', default=False)
    positionRight = models.BooleanField('Текст справа?', default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return 'Баннер, порядковый номер : %s' % self.order

    class Meta:
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"
