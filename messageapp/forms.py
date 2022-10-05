
from django import forms
from .models import Message

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['text']

class FirstReplyForm(forms.ModelForm):
    parent = forms.IntegerField(widget=forms.HiddenInput,required=False)
    text = forms.CharField(widget=forms.Textarea(attrs={'id':'id_reply'}),required=True)
    class Meta:
        model = Message
        fields = ['text','parent']