# Generated by Django 2.2.4 on 2019-09-30 15:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_auto_20190930_1513'),
        ('cart', '0002_auto_20190912_1151'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='text',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='order.ItemText'),
        ),
    ]
