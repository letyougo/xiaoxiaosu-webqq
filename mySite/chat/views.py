from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt


from .models import *
import userQueue
import json


# Create your views here.
@login_required(login_url="/login/")
def home(request):
    member = Member.objects.get(user=request.user)
    friend = member.friend.all()
    group = member.group_members.all()
    return render(request, 'home.html', {"member": member, "friend": friend, "group": [g.to_obj() for g in group]})


global_user_dict = {}

def send_add(request):
    post = json.loads(json.dumps(request.POST))
    cid = str(post['to_id'])
    fid = str(post['from_id'])
    member = Member.objects.get(user=request.user)
    if post['type'] == 'user':
        post['pushType'] = 'user-add'
        post['request'] = 'request'
        if not global_user_dict.has_key(cid):
            global_user_dict[cid] = userQueue.userQueue()
        global_user_dict[cid].send_msg(post)
        print(post['from_name'] + " send add request to " + post['to_name'])

    return HttpResponse("success")

def receive_add(request):
    pass

def send_message(request):
    post = json.loads(json.dumps(request.POST))
    cid = str(post['to_id'])
    fid = str(post['from_id'])
    member = Member.objects.get(user=request.user)
    if post['type'] == 'user':
        post['pushType'] = 'user-message'
        post['messageType'] = 'receive'
        if not global_user_dict.has_key(cid):
            global_user_dict[cid] = userQueue.userQueue()
        global_user_dict[cid].send_msg(post)

        print(post['from_name'] + " send " + post['text'] + " to " + post['to_name'])

    if post['type'] == 'group':
        post['pushType'] = 'group-message'
        post['messageType'] = 'receive'
        for m in Group.objects.get(id=post['to_id']).members.all().select_related():
            cid = str(m.id)
            if m.id != member.id:
                if not global_user_dict.has_key(cid):
                    global_user_dict[cid] = userQueue.userQueue()
                global_user_dict[cid].send_msg(post)
                print(post['from_name'] + " send " + post['text'] + " to " + str(m.user.username) + " in group " + post[
                    'to_name'])

    return JsonResponse({"error":"message send error"})

@csrf_exempt
def get_message(request):
    try:
        cid = str(request.POST['from_id'])
        res = []
        if cid:
            if not global_user_dict.has_key(cid):
                global_user_dict[cid] = userQueue.userQueue()
            res = global_user_dict[cid].get_msg(request)

            if len(res) > 0:
                print(request.user.username + " reveive message")
            return HttpResponse(json.dumps(res))
        else:
            return HttpResponse(json.dumps({"hello": "world"}))
    except:
        return JsonResponse({"error":"send message error"})



def get_member(request):
    output= []
    for obj in Member.objects.all():
        if(obj.user.id!=request.user.id):
            output.append(obj.to_obj())
    return HttpResponse(json.dumps(output))
def get_group(request):
    return JsonResponse(Group.objects.all())