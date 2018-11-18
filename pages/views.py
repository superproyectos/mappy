from django.shortcuts import render, render_to_response
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import redirect


# Create your views here.

def signup(request):
    if isinstance(request.user, AnonymousUser):
        # signup
        return render(request, 'forms/signup.html')
    else:
        # already logged
        return redirect("../")


def login(request):
    if isinstance(request.user, AnonymousUser):
        # login
        return render(request, 'forms/login.html')
    else:
        # already logged
        return redirect("../")


def index(request):
    if not isinstance(request.user, AnonymousUser):
        # already logged
        return render_to_response('userszone.html')
    else:
        # home
        return render_to_response("home/index.html")