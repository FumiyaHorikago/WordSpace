# Generated by Django 3.2.13 on 2022-10-05 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messageapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parent', models.PositiveBigIntegerField()),
                ('message_list', models.JSONField()),
            ],
        ),
        migrations.RemoveField(
            model_name='message',
            name='parent',
        ),
        migrations.AddField(
            model_name='message',
            name='chain',
            field=models.BooleanField(default=False),
        ),
    ]
