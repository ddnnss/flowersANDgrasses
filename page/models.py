from django.db import models

class Banner(models.Model):
    order = models.IntegerField('Порядок отображения', default=1)
    image = models.ImageField('Картинка', upload_to='banners/', blank=False)
    url = models.CharField('Ссылка на кнопке', max_length=255, blank=False)
    bigText = models.CharField('Заголовок', max_length=255, blank=False, default='')
    smallText = models.CharField('Описание', max_length=255, blank=True)
    badgeText = models.CharField('Текст в бейдже', max_length=255, blank=True)
    positionLeft = models.BooleanField('Текст слева?', default=False)
    positionRight = models.BooleanField('Текст справа?', default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return 'Баннер, порядковый номер : %s' % self.order

    class Meta:
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"
