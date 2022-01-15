# Generated by Django 3.1.1 on 2022-01-14 17:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Manufacturer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('adress', models.CharField(blank=True, max_length=999, null=True)),
                ('email', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'manufacturer',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('quantity', models.IntegerField(blank=True, null=True)),
                ('weight', models.FloatField(blank=True, null=True)),
                ('expiration_date', models.DateTimeField(blank=True, null=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('imgSrc', models.CharField(blank=True, max_length=1000, null=True)),
                ('id_manufacturer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productModel.manufacturer')),
            ],
            options={
                'db_table': 'product',
                'managed': True,
            },
        ),
    ]