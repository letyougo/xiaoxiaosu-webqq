# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-02-16 02:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_auto_20160215_1843'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='upload_img'),
        ),
    ]
