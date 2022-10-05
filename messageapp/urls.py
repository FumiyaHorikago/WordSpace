from argparse import Namespace
from django.urls import path
from . import views

app_name= 'messageapp'

urlpatterns = [
    path('',views.index, name="home"),
    path('ajax/store_message/', views.store_message, name="store_message"),
    path('ajax/reload_message/', views.reload_message, name="reload_message"),
    path('ajax/details_message/', views.details_message, name="details_message"),
    path('ajax/store_reply/', views.store_reply, name="store_reply"),
]
