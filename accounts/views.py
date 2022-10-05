from django.shortcuts import render
from django.views.generic import TemplateView
from .forms import AccountForm, AddAccountForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.core.signing import dumps
from django.template.loader import render_to_string

#ログイン画面
def Login(request):
    #POST
    if request.user.is_authenticated:
        #ページ遷移
        return HttpResponseRedirect(reverse('messageapp:home'))

    if request.method == 'POST':
        #フォーム入力のID。パスワード取得
        ID = request.POST.get('userid')
        Pass = request.POST.get('password')

        #Djangoの認証機能
        user = authenticate(username=ID, password=Pass)

        #ユーザー認証
        if user:
            #ユーザーアクティベート認証
            if user.is_active:
                #ログイン
                login(request,user)
                #ページ遷移
                return HttpResponseRedirect(reverse('messageapp:home'))
            else:
                #アカウント利用不可
                return HttpResponse('アカウントが有効ではありません')
        #ユーザー認証失敗
        else:
            return render(request,'accounts/login.html', context={"error":"IDまたはパスワードが違います。"})
    #GET
    else:
        return render(request,'accounts/login.html')


#ログアウト
@login_required
def Logout(request):
    logout(request)
    #ログイン画面遷移
    return HttpResponseRedirect(reverse('accounts:Login'))


#新規登録フォーム
class AccountRegistration(TemplateView):

    def __init__(self):
        self.params = {
            "account_form":AccountForm(),
            "add_account_form":AddAccountForm()
        }

    #Get処理
    def get(self, request):
        self.params["account_form"] = AccountForm(request.session.get('account_form'))
        self.params["add_account_form"] = AddAccountForm(request.session.get('add_account_form'))
        self.params["AccountCreate"] = False

        if request.session.get('account_form'):
            del request.session['account_form']

        if request.session.get('add_account_form'):
            del request.session['add_account_form']

        return render(request, "accounts/register.html", context=self.params)

    #Post処理
    def post(self, request):
        self.params["account_form"] = AccountForm(data=request.POST)
        self.params["add_account_form"] = AddAccountForm(data=request.POST)
        if self.params["account_form"].is_valid() and self.params["add_account_form"].is_valid():
            return render(request, "accounts/register.html", context=self.params)
        else:
            #フォームが有効でない場合
            print(self.params["account_form"].errors)


# アカウント作成確認画面
class AccountConfirm(TemplateView):
    def __init__(self):
        self.params = {
            "account_form":AccountForm(),
            "add_account_form":AddAccountForm()
        }

    #Get処理
    def get(self, request):
        return HttpResponseRedirect(reverse('accounts:register'))

    #Post処理
    def post(self, request):
        self.params["account_form"] = AccountForm(data=request.POST)
        self.params["add_account_form"] = AddAccountForm(data=request.POST)
        # フォームの有効検証
        if self.params["account_form"].is_valid() and self.params["add_account_form"].is_valid():
            return render(request,"accounts/register_confirm.html", context=self.params)
        else:
            #フォームが有効でない場合
            request.session['account_form'] = request.POST
            request.session['add_account_form'] = request.POST
            return HttpResponseRedirect(reverse('accounts:register'))


# アカウント登録完了画面
class AccountComplete(TemplateView):
    def __init__(self):
        self.params = {
            "account_form":AccountForm(),
            "add_account_form":AddAccountForm()
        }

    #Get処理
    def get(self, request):
        return HttpResponseRedirect(reverse('accounts:register'))

    #Post処理
    def post(self, request):
        self.params["account_form"] = AccountForm(data=request.POST)
        self.params["add_account_form"] = AddAccountForm(data=request.POST)

        # 戻るを押した場合
        if request.POST.get('back'):
            request.session['account_form'] = request.POST
            request.session['add_account_form'] = request.POST
            return HttpResponseRedirect(reverse('accounts:register'))

        # 登録を押した場合
        else:
                account = self.params["account_form"].save()
                # パスワードをハッシュ化
                account.set_password(account.password)
                # 仮登録なのでフラグFalse
                account.save()

                # 下記追加情報
                # 下記操作のため、コミットなし
                add_account = self.params["add_account_form"].save(commit=False)
                # AccountForm & AddAccountForm 1vs1 紐付け
                add_account.user = account

                #モデル保存
                add_account.save()

                return render(request, "accounts/register_complete.html")


# 利用規約ページ
def Service(request):
    return render(request, "accounts/service.html")

# プライバシーポリシー
def Privacy(request):
    return render(request, "accounts/privacy.html")