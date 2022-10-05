from cProfile import label
from email.policy import default
from django.db import models
from django.utils import timezone

class Message(models.Model):
    type = models.SmallIntegerField(default=0)  # 0=普通の投稿  5=リプライ
    parent_id = models.BigIntegerField(null=True, blank=True)  # リプライ先の投稿ID
    to_id = models.BigIntegerField(null=True, blank=True)  # リプライ相手のID
    original_id = models.BigIntegerField(null=True, blank=True)  # 元の発言のID
    text = models.TextField('本文')
    auth = models.PositiveBigIntegerField('アカウントID')
    date = models.DateTimeField('日付', default=timezone.now)
    update = models.BooleanField(default=False)  # 返信があった場合のフラグ
    emotion = models.SmallIntegerField(default=0)  # 感情値

class NgWords(models.Model):
    text = models.TextField()