# Generated by Django 3.2.13 on 2022-09-26 07:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AddUserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('birthday', models.DateField(verbose_name='誕生日')),
                ('gender', models.TextField(blank=True, choices=[('男性', '男性'), ('女性', '女性'), ('どちらでもない', 'どちらでもない')], verbose_name='性別')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
