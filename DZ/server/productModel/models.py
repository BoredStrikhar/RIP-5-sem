from django.db import models

class Manufacturer(models.Model):
    name = models.CharField(max_length=100)
    adress = models.CharField(max_length=999, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = 'manufacturer'


class Product(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    id_manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    weight = models.FloatField(blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    imgSrc = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'product'