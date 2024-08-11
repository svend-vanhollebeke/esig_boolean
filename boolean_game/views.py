import datetime

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string

from templates.forms import *


# Create your views here.
def menu(request):
    if request.method == "POST":
        form = FrmEquipe(request.POST)
        if form.is_valid():
            if Equipe.objects.filter(nom__exact=form.cleaned_data['nom']).count() == 0:
                equipe = Equipe()
            else:
                equipe = Equipe.objects.get(nom__exact=form.cleaned_data['nom'])
            equipe.nom = form.cleaned_data['nom']
            equipe.heure = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            equipe.score = 0
            equipe.time_played = 0
            equipe.save()
            request.session['currently_playing'] = equipe.nom
            return redirect(boolean)
    form = FrmEquipe()
    context = {"form": form}
    return render(request, 'menu.html', context)


def add_point_equipe(request, score):
    nom = request.session.get('currently_playing')
    team = Equipe.objects.get(nom__exact=nom)
    team.score = score  # Utilisation du paramètre score
    team.save()
    return HttpResponse(status=204)  # Réponse vide avec statut 204


def boolean(request):
    context = {"": ""}
    return render(request, 'boolean.html', context)


def help(request):
    return render(request, 'help.html')


def classement(request):
    all_teams = Equipe.objects.all().order_by('-score')
    context = {'all_teams': all_teams}
    return render(request, "scores.html", context)


def final(request):
    all_teams = Equipe.objects.all().order_by('-score')
    context = {'all_teams': all_teams}
    return render(request, "final.html", context)