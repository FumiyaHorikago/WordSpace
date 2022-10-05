# Generated by Django 3.2.13 on 2022-10-05 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messageapp', '0003_auto_20221005_1130'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='parent',
            new_name='original_id',
        ),
        migrations.AddField(
            model_name='message',
            name='parent_id',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='message',
            name='to_id',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]
