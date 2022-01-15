from django.contrib import admin
from django.urls import include, path
from productModel import views as productModel

urlpatterns = [
    path('manufacturer/', productModel.ManufacturerView.as_view()),
    path('manufacturer/<int:pk>', productModel.SingleManufacturerView.as_view()),

    path('product/', productModel.ProductView.as_view()),
    path('product/<int:pk>', productModel.SingleProductView.as_view()),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls)
]