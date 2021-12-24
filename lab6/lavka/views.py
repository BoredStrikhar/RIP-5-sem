from django.http import HttpResponse
from django.shortcuts import render
from datetime import date
from .models import Product
from rest_framework import viewsets
from lavka.serializers import ProductSerializer
from lavka.models import Product

class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Product.objects.all().order_by('pk')
    serializer_class = ProductSerializer  # Сериализатор для модели
