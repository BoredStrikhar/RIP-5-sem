from productModel.models import Manufacturer, Product
from rest_framework import serializers

class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ("pk", "name", "adress", "email")

class ProductSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    manufacturer = ManufacturerSerializer(source='id_manufacturer', required=False)
    class Meta:
        model = Product
        fields = ["pk", "name", "price", "quantity", "manufacturer", "id_manufacturer", "weight", "description", "imgSrc"]
