# Generated by Django 3.2.13 on 2022-09-27 06:58

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(verbose_name='本文')),
                ('auth', models.PositiveBigIntegerField(verbose_name='アカウントID')),
                ('date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='日付')),
                ('parent', models.PositiveBigIntegerField(blank=True, null=True)),
                ('emotion', models.SmallIntegerField(default=0)),
            ],
        ),
    ]