from django.contrib import admin
from django.urls import path
from lavka import views
from django.contrib import admin
from lavka import views as product_views
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'products', product_views.ProductViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('admin/', admin.site.urls),
]