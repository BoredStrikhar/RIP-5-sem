"""rk2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from operators import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name="main"),
    path('operator/', include([
        path('', views.read_operator, name='read_operator'),
        path('create/', views.create_operator, name="create_operator"),
        path('update/<int:operator_id>/', views.update_operator, name="update_operator"),
        path('delete/<int:operator_id>/', views.delete_operator, name="delete_operator"),
    ])),
    path('prog_lang/', include([
        path('', views.read_prog_lang, name='read_prog_lang'),
        path('create/', views.create_prog_lang, name="create_prog_lang"),
        path('update/<int:prog_lang_id>/',
             views.update_prog_lang, name="update_prog_lang"),
        path('delete/<int:prog_lang_id>/',
             views.delete_prog_lang, name="delete_prog_lang"),
    ])),
    path('report/', views.report, name="report"),
]
