from django.contrib import admin
from django.urls import path
from lavka import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.productList),
    path('product/<int:id>/', views.GetProduct, name='product_url')
]