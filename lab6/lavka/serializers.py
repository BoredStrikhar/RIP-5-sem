from lavka.models import Product
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Product
        # Поля, которые мы сериализуем
        fields = ["pk", "name", "price", "quantity", "manufacturer", "weight", "expiration_date", "description", "imgSrc"]