from django.db.models.aggregates import Avg, Sum
from django.http.response import HttpResponse
from django.shortcuts import get_list_or_404, get_object_or_404, redirect, render
from .models import ProgrammingLanguage, Operator
from django.db import models


def index(request):
    return render(request, 'index.html')

# operators


def read_operator(request):
    operators = Operator.objects.all()
    return render(request, 'operator/operator_list.html', {'operators': operators})


def create_operator(request):
    if request.method == 'GET':
        prog_langs = ProgrammingLanguage.objects.all()
        return render(request, 'operator/create_operator.html', {"prog_langs": prog_langs})
    else:
        dto = {}
        for key in request.POST:
            if key in Operator.__dict__:
                dto[key] = request.POST[key]
        dto['prog_lang'] = get_object_or_404(ProgrammingLanguage, pk=request.POST['prog_lang'])
        new_operator = Operator(**dto)
        new_operator.save()
        return redirect('read_operator')


def update_operator(request, operator_id):
    if request.method == 'GET':
        prog_langs = ProgrammingLanguage.objects.all()
        operator = get_object_or_404(Operator, pk=operator_id)
        return render(request, 'operator/update_operator.html', {"operator": operator, "prog_langs": prog_langs})
    else:
        operator = get_object_or_404(Operator, pk=operator_id)
        for key in request.POST:
            if key in operator.__dict__ and key != 'prog_lang':
                setattr(operator, key, request.POST[key])
        if 'prog_lang' in request.POST:
            setattr(operator, 'prog_lang', get_object_or_404(
                ProgrammingLanguage, pk=request.POST['prog_lang']))
        operator.save()
        return redirect('read_operator')


def delete_operator(request, operator_id):
    operator = get_object_or_404(Operator, pk=operator_id)
    operator.delete()
    return redirect(request.META.get('HTTP_REFERER'))

# prog_langs


def read_prog_lang(request):
    prog_langs = ProgrammingLanguage.objects.all()
    return render(request, 'prog_lang/prog_lang_list.html', {'prog_langs': prog_langs})


def create_prog_lang(request):
    if request.method == 'GET':
        return render(request, 'prog_lang/create_prog_lang.html')
    else:
        new_prog_lang = ProgrammingLanguage(name=request.POST['name'])
        new_prog_lang.save()
        return redirect('read_prog_lang')


def update_prog_lang(request, prog_lang_id):
    if request.method == 'GET':
        prog_lang = get_object_or_404(ProgrammingLanguage, pk=prog_lang_id)
        return render(request, 'prog_lang/update_prog_lang.html', {"prog_lang": prog_lang})
    else:
        prog_lang = get_object_or_404(ProgrammingLanguage, pk=prog_lang_id)
        for key in request.POST:
            if key in prog_lang.__dict__:
                setattr(prog_lang, key, request.POST[key])
        prog_lang.save()
        return redirect('read_prog_lang')


def delete_prog_lang(request, prog_lang_id):
    prog_lang = get_object_or_404(ProgrammingLanguage, pk=prog_lang_id)
    prog_lang.delete()
    return redirect(request.META.get('HTTP_REFERER'))


# REPORT


def report(request):
    sorted_operators = Operator.objects.all().order_by("prog_lang__name")
    num_of_operators = []
    for prog_lang in ProgrammingLanguage.objects.all():
        num_of_operators.append({"prog_lang": prog_lang,  "num_of_operators": Operator.objects.filter(
            prog_lang=prog_lang.pk).aggregate(Sum('num_of_operands'))['num_of_operands__sum']})
    return render(request, 'report.html', {"sorted_operators": sorted_operators, "num_of_operators": sorted(num_of_operators, key=lambda x: -1*x['num_of_operators'])})
