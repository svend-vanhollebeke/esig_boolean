from django.forms import ModelForm
from boolean_game.models import *


class FrmEquipe(ModelForm):
    class Meta:
        model = Equipe
        fields = ['nom']
        labels = {
            'nom': 'Équipe'
        }
