from django.urls import path,include
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.Login, name="Login"),
    path('logout/', views.Logout, name="Logout"),
    path('register/', views.AccountRegistration.as_view(), name="register"),
    path('register_confirm/', views.AccountConfirm.as_view(), name="register_confirm"),
    path('register_complete/', views.AccountComplete.as_view(), name="register_complete"),
    path('service/', views.Service, name="Service"),
    path('privacy/', views.Privacy, name="Privacy"),
]
