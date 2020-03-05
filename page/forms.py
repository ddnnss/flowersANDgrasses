from django import forms
from django.forms import ModelForm
from .models import *


class CallbackForm(ModelForm):


    class Meta:
        model = Callback
        fields = ('name', 'email', 'company', 'phone', 'message', )

