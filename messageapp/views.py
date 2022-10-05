from django.shortcuts import render, redirect
from .forms import MessageForm, FirstReplyForm
from .models import Message, NgWords
from accounts.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db import models
from mlask import MLAsk
import random
import MeCab


# Create your views here.
@login_required
def index(request):
    # 送信内容を基にフォームを作る。空のフォーム
    form = MessageForm(None)
    reply = FirstReplyForm(None)

    records = Message.objects.all()
    amount = Message.objects.all().count()
    emoSum = 0
    posiRatio = 0
    negaRatio = 0

    for record in records:
        if int(record.emotion) < 0:
            emoSum += record.emotion * -1
        else:
            emoSum += record.emotion

    posiSum = Message.objects.filter(emotion__gt = 0).aggregate(models.Sum('emotion'))
    negaSum = Message.objects.filter(emotion__lt = 0).aggregate(models.Sum('emotion'))

    print(posiSum)

    if posiSum['emotion__sum']:
        posiRatio = posiSum['emotion__sum'] / emoSum

    if negaSum['emotion__sum']:
        negaRatio = negaSum['emotion__sum']* -1 / emoSum

    # ネガポジ合計が一定値を超えた場合に変化を加える
    impactFlag = False
    if emoSum > 500:
        impactFlag = True

    impact = 'normal'

    if impactFlag:
        if posiRatio > negaRatio:
            if posiRatio >= 0.500 and posiRatio <= 0.600:
                impact = 'normal'
            elif posiRatio > 0.600 and posiRatio <= 0.800:
                impact = 'posi-lit'
            elif posiRatio > 0.800:
                impact = 'positive'
        else:
            if negaRatio >= 0.500 and negaRatio <= 0.600:
                impact = 'normal'
            elif negaRatio > 0.600 and negaRatio <= 0.800:
                impact = 'nega-lit'
            elif negaRatio > 0.800:
                impact = 'negative'


    # BGM選択
    choice = random.randint(0,1)

    context = {
        'form': form,
        'reply': reply,
        'message_list':Message.objects.exclude(auth=request.user.id).order_by('?')[:10],
        'user':request.user,
        'impact_class': impact,
        'emotion': emoSum,
        'posiRatio': posiRatio * 100,
        'negaRatio': negaRatio * 100,
        'recordAmount': amount,
        'bgm_choice': choice
    }
    return render(request,'messageapp/index.html',context)


# Ajax メッセージ送信
@login_required
def store_message(request):
    if request.method == 'POST':
        text = request.POST.get('text')
        auth = request.user.id

        # 発言内容が空白の場合
        if text == "":
            res = {
                'code': 2,
                'result': "発言内容が入力されていません。",
            }
            return JsonResponse(res, safe=False)

        #発言内容に不適切なワードが含まれている場合
        # if text == "":
        #     res = {
        #         'code': 4,
        #         'result': "発言内容に不適切なワードが含まれています。",
        #     }
        #     return JsonResponse(res, safe=False)


        # 感情判断
        emotion_analyzer = MLAsk()
        analyzed = emotion_analyzer.analyze(text)
        if analyzed['emotion'] != None:
            if analyzed['orientation'] == 'NEGATIVE':
                if analyzed['intension'] == 0:
                    emotion = -1
                elif analyzed['intension'] == 1:
                    emotion = -2
                elif analyzed['intension'] == 2:
                    emotion = -3
                else:
                    emotion = -3
            elif analyzed['orientation'] == 'POSITIVE':
                if analyzed['intension'] == 0:
                    emotion = 1
                elif analyzed['intension'] == 1:
                    emotion = 2
                elif analyzed['intension'] == 2:
                    emotion = 3
                else:
                    emotion = 3
        else:
            emotion = 0

        # DB保存処理
        message = Message(text=text,auth=auth,emotion=emotion)
        message.save()


        # レスポンス
        res = {
            'code': 0,
            'result': 'Saved',
            'emotion': emotion,
        }

        return JsonResponse(res, safe=False)
    else:
        res = {
            'code': 1,
            'result': 'Method Not Allowed',
        }
        return JsonResponse(res, safe=False)

# Ajax メッセージ再読み込み
@login_required
def reload_message(request):

    context = {
         'message_list':Message.objects.order_by('?')[:10], # exclude(auth=request.user.id).
    }
    return render(request,'messageapp/widgets/messageWrap.html',context)


# Ajax メッセージ詳細取得
@login_required
def details_message(request):
    post_id = request.POST.get('id')
    original = Message.objects.get(id=post_id)
    author = User.objects.get(id=original.auth)

    myReply = Message.objects.filter(type=5,original_id=post_id,to_id=author.id,auth=request.user.id)
    authorReply = Message.objects.filter(type=5,original_id=post_id,to_id=request.user.id,auth=author.id)

    replyQuery = []

    # 自分の返信投稿がない場合（連鎖発生なし）
    if not myReply:
        context = {
            'original':original,
            'nickname':author.nickname,
            'myname':request.user.nickname,
            'reply': replyQuery,
        }
        return render(request,'messageapp/widgets/chainFlow.html',context)

    loopCount = 0

    if myReply.count() > authorReply.count():
        loopCount = myReply.count()
    else:
        loopCount = authorReply.count()


    for i in range(loopCount):
        try:
            replyQuery.append(myReply[i])
        except IndexError:
            continue
        try:
            replyQuery.append(authorReply[i])
        except IndexError:
            continue


    print(replyQuery)


    context = {
         'original':original,
         'nickname':author.nickname,
         'myname':request.user.nickname,
         'replyQuery': replyQuery,
    }
    return render(request,'messageapp/widgets/chainFlow.html',context)


# Ajax リプライ送信
@login_required
def store_reply(request):
    if request.method == 'POST':
        text = request.POST.get('text')
        auth = request.user.id
        original_id = request.POST.get('original_id')
        parent_id = request.POST.get('parent_id')

        print(f"text => {text}, auth => {auth}, original_id => {original_id}, parent_id => {parent_id}")

        # IDがない場合
        if original_id == "" or parent_id == "":
            res = {
                'code': 3,
                'result': "メッセージIDがありません。",
            }
            return JsonResponse(res, safe=False)


        parentMessage = Message.objects.get(id=parent_id)

        #リプライに返信する場合
        if parentMessage.type == 5:
            if int(original_id) != parentMessage.original_id:
                res = {
                    'code': 3,
                    'result': "メッセージIDが不正です。",
                }
                return JsonResponse(res, safe=False)
        else:
            if int(original_id) != parentMessage.id:
                res = {
                    'code': 3,
                    'result': "メッセージIDが不正です。",
                }
                return JsonResponse(res, safe=False)



        # 発言内容が空白の場合
        if text == "":
            res = {
                'code': 2,
                'result': "発言内容が入力されていません。",
            }
            return JsonResponse(res, safe=False)

        #発言内容に不適切なワードが含まれている場合
        # if text == "":
        #     res = {
        #         'code': 4,
        #         'result': "発言内容に不適切なワードが含まれています。",
        #     }
        #     return JsonResponse(res, safe=False)


        # 感情判断
        emotion_analyzer = MLAsk()
        analyzed = emotion_analyzer.analyze(text)
        if analyzed['emotion'] != None:
            if analyzed['orientation'] == 'NEGATIVE':
                if analyzed['intension'] == 0:
                    emotion = -1
                elif analyzed['intension'] == 1:
                    emotion = -2
                elif analyzed['intension'] == 2:
                    emotion = -3
                else:
                    emotion = -3
            elif analyzed['orientation'] == 'POSITIVE':
                if analyzed['intension'] == 0:
                    emotion = 1
                elif analyzed['intension'] == 1:
                    emotion = 2
                elif analyzed['intension'] == 2:
                    emotion = 3
                else:
                    emotion = 3
        else:
            emotion = 0

        # DB保存処理
        message = Message(text=text,auth=auth,emotion=emotion,type=5,parent_id=parent_id,original_id=original_id,to_id=parentMessage.auth)
        message.save()

        parentMessage.update = True
        parentMessage.save()

        # レスポンス
        res = {
            'code': 0,
            'result': 'Saved',
            'emotion': emotion,
        }

        return JsonResponse(res, safe=False)
    else:
        res = {
            'code': 1,
            'result': 'Method Not Allowed',
        }
        return JsonResponse(res, safe=False)