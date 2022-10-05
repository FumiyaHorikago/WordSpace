from datetime import datetime
from django import forms
from .models import User
from .models import GENDER_CHOICES, AddUserInfo
from datetime import date
from dateutil import relativedelta

class AccountForm(forms.ModelForm):
    #パスワード入力：非表示対応
    password = forms.CharField(widget=forms.PasswordInput(),label="パスワード")
    class Meta:
        # ユーザー認証
        model = User
        # フィールド指定
        fields = ('username', 'email', 'password','nickname')
        # フィールド名指定
        labels = {'username': 'ユーザーID', 'email': 'メールアドレス', 'nickname':'ニックネーム'}
        help_texts = {'username': ''}

class AddAccountForm(forms.ModelForm):
    now = date.today()
    max = now - relativedelta.relativedelta(years=15)
    min = date(year=now.year,month=1,day=1) - relativedelta.relativedelta(years=80)
    birthday = forms.DateField(widget=forms.DateInput(attrs={"type":"date","max":max,"min":min}),label="生年月日")
    class Meta:
        # モデルクラス指定
        model = AddUserInfo
        fields = ('birthday','gender')
        labels = {'gender': '性別'}