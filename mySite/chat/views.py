from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.contrib.auth.decorators import login_required

from .models import *
import json


# Create your views here.
@login_required(login_url="/login/")
def home(request):
    member = Member.objects.get(user = request.user)
    friend = member.friend.all()
    group = member.group_members.all()
    return render(request,'home.html',{"friend":friend,"group":[g.to_obj() for g in group]})


